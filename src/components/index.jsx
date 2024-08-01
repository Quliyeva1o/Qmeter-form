import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import TextField from '@mui/material/TextField';
import { Select } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {get} from '../API/requests.js'
import { AsYouType } from 'libphonenumber-js';
import aze from '../assets/request/azerbaijan.png';
import jor from '../assets/request/jordon.png';
import kaz from '../assets/request/kazakhistan.png';
import kwt from '../assets/request/kuwait.png';
import om from '../assets/request/oman.png';
import pol from '../assets/request/poland.png';
import sa from '../assets/request/saudi_arabia.png';
import tr from '../assets/request/turkey.png';
import uae from '../assets/request/uae.png';
import us from '../assets/request/us.png';
import uss from '../assets/us.png';
import countryOptions from '../utils/constants.js';



const LocalCountries = {
    AZ: aze,
    KAZ: kaz,
    JOR: jor,
    KWT: kwt,
    OM: om,
    POL: pol,
    SA: sa,
    UAE: uae,
    US: us,
};

const Form = () => {
    const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
    const [localCountry, setLocalCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await get();
                if (res.data && res.data.country) {
                    setLocalCountry(res.data.country);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const validationSchema = yup.object({
        country: yup.string().required('Country is required'),
        name: yup.string().required('Name is required'),
        phone: yup.string().required('Phone number is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            country: 'Select Country',
            name: '',
            phone: '',
            email: '',
        },
        validationSchema,
        onSubmit: values => {
            formik.resetForm();
            console.log(values);
        },
    });

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;
        const formattedNumber = new AsYouType(selectedCountry.code.replace('+', '')).input(phoneNumber);
        formik.setFieldValue('phone', formattedNumber);
    };

    const handleCountryChange = (value) => {
        const selectedOption = countryOptions.find(option => option.code === value);
        if (selectedOption) {
            setSelectedCountry(selectedOption);
            formik.setFieldValue('country', selectedOption.country);
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
                            <label htmlFor="name">Name</label>
                            <TextField
                                placeholder='Pietro Schirano'
                                fullWidth
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                    borderColor: formik.touched.name && formik.errors.name ? 'red' : '#849ab4',
                                    borderWidth: '1px',
                                    borderStyle: 'solid'
                                }}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                            />
                            <label htmlFor="email">Email</label>
                            <TextField
                                placeholder='example@qmeter.net'
                                fullWidth
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{
                                    borderColor: formik.touched.email && formik.errors.email ? 'red' : '#849ab4',
                                    borderWidth: '1px',
                                    borderStyle: 'solid'
                                }}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                            <label htmlFor="phone">Phone number</label>
                            <div className={styles.phoneNumber} style={{
                                borderColor: formik.touched.phone && formik.errors.phone ? 'red' : '#849ab4',
                                borderWidth: '1px',
                                borderStyle: 'solid'
                            }}>
                                <Select
                                    value={selectedCountry.code}
                                    onChange={handleCountryChange}
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
                                    onChange={handlePhoneChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                />
                            </div>

                            <label htmlFor="country">Country</label>
                            <Select
                                className={styles.selectt}
                                id="country"
                                name="country"
                                value={formik.values.country}
                                onChange={value => formik.setFieldValue('country', value)}
                                onBlur={formik.handleBlur}
                            >
                                {countryOptions.map(option => (
                                    <Select.Option key={option.country} value={option.country}>
                                        {option.country}
                                    </Select.Option>
                                ))}
                            </Select>
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

export default Form;
