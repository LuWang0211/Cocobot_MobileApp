import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../../components/AppHeader/Header';
import { color } from '../../../constant';
import SettingsTitle from '../../../components/SettingsComponents/SettingsTitle';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../../components/Button/CustomButton';
import FilledTextInput from '../../../components/TextInput/FilledTextInput';
import firebase from 'firebase';
import { Formik } from 'formik';
import * as yup from 'yup';
import { SettingsContext } from '../../../context';
import { updateUserInFirestore, getRealtimeChanges } from '../../../functions/FirestoreFunction';
import LoadingIndicator from '../../../components/Indicator/LoadingIndicator';

function PersonalInformation(props) {
    const user = firebase.auth().currentUser;
    const { refresh } = useContext(SettingsContext);
    const [userFromFS, setUserFromFS] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const subscriber = getRealtimeChanges(
            'Users',
            user.uid,
            (change) => {
                setUserFromFS(change);
                setLoading(false);
            }
        );

        return () => subscriber();
    }, [user]);

    if (!user || isLoading) {
        return (
            <LoadingIndicator />
        );
    }

    function retrieveFirstName() {
        if (user.isAnonymous && !user.displayName) return 'John';

        let displayName = user.displayName;

        if (userFromFS) {
            displayName = userFromFS.displayName;
        }

        const split = displayName.split(' ');

        if (split.length > 0) {
            return split[0];
        }

        return ''
    }

    function retrieveLastName() {
        if (user.isAnonymous && !user.displayName) return 'Doe';

        let displayName = user.displayName;

        if (userFromFS) {
            displayName = userFromFS.displayName;
        }

        const split = displayName.split(' ');

        let lastName = '';

        for (var i = 1; i < split.length; i++) {
            lastName += split[i];
        }

        return lastName;
    }

    function retrieveGender() {
        if (userFromFS) {
            if (userFromFS.gender) {
                return userFromFS.gender;
            }
        }
        return 'Female';
    }

    function retrieveDob() {
        if (userFromFS) {
            if (userFromFS.dob) {
                return userFromFS.dob;
            }
        }
        return '01/01/1985';
    }

    function retrieveEmail() {
        return user.isAnonymous ? 'johndoe@example.com' : user.email;
    }

    function save(values) {
        const displayName = (values.firstName + ' ' + values.lastName).trim();

        if (formInitialValues !== values) {
            if (!user.isAnonymous) {
                updateUserInFirestore(
                    user.uid,
                    {
                        displayName: displayName,
                        gender: values.gender,
                        dob: values.dob,
                    }
                );
            }

            user
                .updateProfile({
                    displayName: displayName,
                })
                .then(() => {
                    if (user.isAnonymous) refresh(true);
                    props.navigation.goBack();
                });
        }
        else {
            props.navigation.goBack();
        }
    }

    const formInitialValues = {
        firstName: retrieveFirstName(),
        lastName: retrieveLastName(),
        gender: retrieveGender(),
        dob: retrieveDob(),
        email: retrieveEmail(),
    }

    return (
        <View style={styles.container}>
            <Header
                back={() => props.navigation.goBack()}
            />
            <ScrollView>
                <View style={styles.body}>
                    <SettingsTitle text='Edit Personal Info' />
                    <Formik
                        initialValues={formInitialValues}
                        onSubmit={save}
                        validationSchema={yup.object().shape({
                            firstName: yup
                                .string()
                                .label('First Name'),
                            lastName: yup
                                .string()
                                .label('Last Name'),
                            gender: yup
                                .string()
                                .label('Gender'),
                            dob: yup
                                .string()
                                .label('Date of Birth'),
                            email: yup
                                .string()
                                .label('Email')
                                .email('Email must be valid')
                                .required(),
                        })}
                    >
                        {({ values, handleChange, errors, setFieldTouched, isValid, handleSubmit }) => (
                            <Fragment>
                                <FilledTextInput
                                    title='First Name'
                                    placeholder='First Name'
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    style={styles.textInput}
                                />
                                <FilledTextInput
                                    title='Last Name'
                                    placeholder='Last Name'
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')}
                                    style={styles.textInput}
                                />
                                <FilledTextInput
                                    title='Gender'
                                    placeholder='Gender'
                                    value={values.gender}
                                    onChangeText={handleChange('gender')}
                                    style={styles.textInput}
                                />
                                <FilledTextInput
                                    title='Date of Birth'
                                    placeholder='Date of Birth'
                                    value={values.dob}
                                    onChangeText={handleChange('dob')}
                                    style={styles.textInput}
                                />
                                <FilledTextInput
                                    title='Email'
                                    placeholder='Email'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    style={styles.textInput}
                                />
                                <CustomButton
                                    title='Save'
                                    style={{ backgroundColor: color.sosRed, marginTop: 20, marginBottom: 16 }}
                                    onPress={handleSubmit}
                                />
                            </Fragment>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white,
    },
    body: {
        paddingHorizontal: 16,
    },
    textInput: {
        marginHorizontal: 0,
        marginVertical: 12
    }
});

export default PersonalInformation;