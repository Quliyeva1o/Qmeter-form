import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import TextField from '@mui/material/TextField';
import { Select } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { get } from '../API/requests.js';
import { AsYouType } from 'libphonenumber-js';
import uss from '../assets/us.png';
import countryOptions, { LocalCountries } from '../utils/constants.tsx';

const validationSchema = yup.object({
    country: yup.string().required('Country is required'),
    name: yup.string()
        .required('Name is required')
        .test('word-count', 'Name must be 2 or 3 words', (value) => {
            if (!value) return false;
            const wordCount = value.trim().split(/\s+/).length;
            return wordCount === 2 || wordCount === 3;
        }),
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});

const Form = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [localCountry, setLocalCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get();
                if (res.data && res.data.country) {
                    const country = countryOptions.find((x) => x.localeName === res.data.country);
                    setLocalCountry(res.data.country);
                    setSelectedCountry(country);
                    if (country) {
                        formik.setFieldValue('num', country.code);
                        formik.setFieldValue('country', country.country);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            num: '', // Initial value for country code
            country: '',
            name: '',
            phone: '',
            email: '',
        },
        validationSchema,
        onSubmit: values => {
            const formattedNumber = new AsYouType(values.num.replace('+', '')).input(values.phone);
            console.log({
                ...values,
                phone: formattedNumber
            });
            formik.resetForm();
        },
    });

    const handlePhoneChange = (e) => {
        formik.setFieldValue('phone', e.target.value);
    };

    const handleCountryChange = (value) => {
        const selectedOption = countryOptions.find(option => option.code === value);
        if (selectedOption) {
            formik.setFieldValue('country', selectedOption.country);
        }
    };

    const renderField = (field) => {
        switch (field.name) {
            case 'phone':
                return (
                    <CountryPhone
                        formik={formik}
                        value={formik.values.num}
                        phonechange={handlePhoneChange}
                    />
                );
            case 'country':
                return (
                    <Select
                        placeholder={field.placeholder}
                        fullWidth
                        id={field.name}
                        name={field.name}
                        className={formik.touched[field.name] && formik.errors[field.name] ? styles.error : styles.selectt}
                        value={formik.values.country} 
                        onChange={handleCountryChange}
                        onBlur={formik.handleBlur}
                        options={countryOptions.map(option => ({
                            value: option.code,
                            label: (
                                <div className={styles.optionContent}>
                                    <p>{option.country}</p>
                                </div>
                            ),
                        }))}
                    />
                );
            default:
                return (
                    <TextField
                        placeholder={field.placeholder}
                        fullWidth
                        id={field.name}
                        name={field.name}
                        className={formik.touched[field.name] && formik.errors[field.name] ? styles.error : ""}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                    />
                );
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.df} d-lg-flex`}>
                <div className={`${styles.textContent} col-lg-7`}>
                    <div className={styles.image}></div>
                    <div className={styles.nobg}></div>
                    <h2>
                        Transform your
                        <br />
                        <span>Customer Experience</span>
                    </h2>
                    <p>
                        Get a callback from our professionals to receive a free consultation and define a customized solution for your business needs. <br />
                        We have demonstrated experience in this field and are ready to support you.
                    </p>
                </div>
                <div className={styles.form}>
                    <div className={styles.formDiv}>
                        <img src={LocalCountries[localCountry] || uss} alt="Country Flag" />
                        <form onSubmit={formik.handleSubmit}>
                            {formOptions.map((field) => (
                                <React.Fragment key={field.name}>
                                    <label htmlFor={field.name}>{field.label}</label>
                                    {renderField(field)}
                                </React.Fragment>
                            ))}
                            <span>
                                By filling out the form, you consent to the processing of personal data
                            </span>
                            <button type='submit'>
                                CLAIM YOUR FREE CONSULTATION NOW
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const formOptions = [
    {
        label: "Name",
        name: "name",
        placeholder: "Pietro Schirano",
        component: TextField
    },
    {
        label: "Email",
        name: "email",
        placeholder: "example@qmeter.net",
        component: TextField
    },
    {
        label: "Phone Number",
        name: "phone",
        placeholder: "(__) ___-__-__",
        component: TextField,
    },
    {
        label: "Country",
        name: "country",
        placeholder: "Select Country",
        component: Select,
    }
];

const CountryPhone = ({ formik, value, phonechange }) => {
    return (
        <div
            className={formik.touched.phone && formik.errors.phone ? styles.error : styles.phoneNumber}
        >
            <Select
                className={styles.phoneSelect}
                value={value}
                onChange={value => formik.setFieldValue('num', value)}
                style={{ width: '140px' }}
                options={countryOptions.map(option => ({
                    value: option.code,
                    label: (
                        <div className={styles.optionContent}>
                            <img src={option.flag} alt={option.country} />
                            <p>{option.code}</p>
                        </div>
                    ),
                }))}
            />
            <TextField
                placeholder='(__) ___-__-__'
                fullWidth
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={phonechange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
            />
        </div>
    );
};

export default Form;
