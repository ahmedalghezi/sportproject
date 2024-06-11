import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import InfoBoosT from './img/InfoBoosT.svg';
  // Ensure the path is correct and matches the actual file structure



const Form = styled.form`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: right;
  direction: rtl;
  font-family: 'Arial', sans-serif;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: calc(100% - 22px);
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  justify-items: start;
`;

const CheckboxLabel = styled.label`
  margin-bottom: 5px;
  font-size: 1em;
  cursor: pointer;
  ${(props) =>
          props.checked &&
          css`
      background-color: #007bff;
      color: white;
      border-radius: 4px;
      padding: 5px;
    `}
  ${(props) =>
          props.notAvailable &&
          css`
      color: grey;
      cursor: not-allowed;
    `}
`;

const CheckboxInput = styled.input`
  justify-self: end;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const Link = styled.a`
  display: block;
  margin: 10px 0;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const TopicSelectionForm = ({ onSubmit }) => {
    const [topics, setTopics] = useState({
        'الاحياء': 'available',
        'الفيزياء': 'available',
        'الكيمياء': 'not available',
        'الرياضيات': 'not available',
        'اللغة الانكليزية': 'not available',
    });

    const [selectedTopics, setSelectedTopics] = useState({
        'الاحياء': false,
        'الفيزياء': false,
        'الكيمياء': false,
        'الرياضيات': false,
        'اللغة الانكليزية': false,
    });

    const handleTopicChange = (e) => {
        const { name, checked } = e.target;
        setSelectedTopics({
            ...selectedTopics,
            [name]: checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selected = Object.keys(selectedTopics).filter((topic) => selectedTopics[topic]);
        onSubmit(selected);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>اختر المواضيع التي ترغب باللانضمام لها:</Label>
                <CheckboxGrid>
                    {Object.keys(topics).map((topic) => (
                        <React.Fragment key={topic}>
                            <CheckboxInput
                                type="checkbox"
                                name={topic}
                                checked={selectedTopics[topic]}
                                onChange={handleTopicChange}
                                id={topic}
                                disabled={topics[topic] === 'not available'}
                            />
                            <CheckboxLabel
                                htmlFor={topic}
                                checked={selectedTopics[topic]}
                                notAvailable={topics[topic] === 'not available'}
                            >
                                {topic} {topics[topic] === 'not available' && '( لاتوجد مقاعد شاغرة حالياً)'}
                            </CheckboxLabel>
                        </React.Fragment>
                    ))}
                </CheckboxGrid>
            </FormGroup>
            <SubmitButton type="submit">تأكيد</SubmitButton>
        </Form>
    );
};

const StudentRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        governorate: '',
        schoolName: '',
        grade: '',
        class: '',
        desiredGrade: '',
        agreeToTerms: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: fieldValue,
        });

        if (name === 'class' && value !== 'الصف السادس') {
            setFormData((prevState) => ({
                ...prevState,
                desiredGrade: '0',
            }));
        }

        if (formErrors[name]) {
            validateField(name, fieldValue, type);
        }
    };

    const validateField = (name, value, type) => {
        let errors = { ...formErrors };
        switch (name) {
            case 'phoneNumber':
                if (!/^\d{10,15}$/.test(value)) {
                    errors.phoneNumber = 'رقم الموبايل يجب أن يكون بين 10 و 15 رقم.';
                } else {
                    delete errors.phoneNumber;
                }
                break;
            case 'grade':
            case 'desiredGrade':
                if (value < 0 || value > 100) {
                    errors[name] = 'الدرجة يجب أن تكون بين 0 و 100.';
                } else {
                    delete errors[name];
                }
                break;
            case 'name':
            case 'governorate':
            case 'schoolName':
                if (value.trim() === '') {
                    errors[name] = 'هذه الخانة مطلوبة.';
                } else {
                    delete errors[name];
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = 'الرجاء إدخال بريد إلكتروني صالح.';
                } else {
                    delete errors.email;
                }
                break;
            case 'password':
                if (value.length < 8) {
                    errors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل.';
                } else {
                    delete errors.password;
                }
                break;
            case 'agreeToTerms':
                if (!value) {
                    errors.agreeToTerms = 'يجب الموافقة على الشروط.';
                } else {
                    delete errors.agreeToTerms;
                }
                break;
            default:
                break;
        }
        setFormErrors(errors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field], typeof formData[field] === 'boolean' ? 'checkbox' : 'text');
        });

        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('https://info4iq.com/bos/api/profile/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                console.log('Form Data:', result);
                setFormSubmitted(true);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        } else {
            setFormErrors(errors);
        }
    };

    const handleTopicSubmit = async (selectedTopics) => {
        try {
            const response = await fetch('https://info4iq.com/bos/api/profile/select-topics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selectedTopics }),
            });
            const result = await response.json();
            console.log('Selected Topics:', result);
            window.location.href = 'https://info4iq.com/boost/after_reg/';
        } catch (error) {
            console.error('Error submitting topics:', error);
        }
    };

    if (formSubmitted) {
        return <TopicSelectionForm onSubmit={handleTopicSubmit} />;
    }

    return (
        <div>
            <img src={InfoBoosT} alt="InfoBoosT" style={{ marginBottom: '20px', height:'100px' }} />
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label>الاسم:</Label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                {formErrors.name && <p>{formErrors.name}</p>}
            </FormGroup>
            <FormGroup>
                <Label>البريد الإلكتروني:</Label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {formErrors.email && <p>{formErrors.email}</p>}
            </FormGroup>
            <FormGroup>
                <Label>كلمة المرور:</Label>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {formErrors.password && <p>{formErrors.password}</p>}
            </FormGroup>
            <FormGroup>
                <Label>رقم الموبايل:</Label>
                <Input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                {formErrors.phoneNumber && <p>{formErrors.phoneNumber}</p>}
            </FormGroup>
            <FormGroup>
                <Label>المحافظة:</Label>
                <Input
                    type="text"
                    name="governorate"
                    value={formData.governorate}
                    onChange={handleChange}
                    required
                />
                {formErrors.governorate && <p>{formErrors.governorate}</p>}
            </FormGroup>
            <FormGroup>
                <Label>اسم المدرسة:</Label>
                <Input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    required
                />
                {formErrors.schoolName && <p>{formErrors.schoolName}</p>}
            </FormGroup>
            <FormGroup>
                <Label>المعدل في الصف الثالث المتوسط:</Label>
                <Input
                    type="number"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    required
                />
                {formErrors.grade && <p>{formErrors.grade}</p>}
            </FormGroup>
            <FormGroup>
                <Label>اختر الصف:</Label>
                <Select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                >
                    <option value="">اختر الصف</option>
                    <option value="الصف الرابع">الصف الرابع</option>
                    <option value="الصف الخامس">الصف الخامس</option>
                    <option value="الصف السادس">الصف السادس</option>
                </Select>
                {formErrors.class && <p>{formErrors.class}</p>}
            </FormGroup>
            {formData.class === 'الصف السادس' && (
                <FormGroup>
                    <Label>المعدل المنشود في السادس الاعدادي:</Label>
                    <Input
                        type="number"
                        name="desiredGrade"
                        value={formData.desiredGrade}
                        onChange={handleChange}
                        required
                    />
                    {formErrors.desiredGrade && <p>{formErrors.desiredGrade}</p>}
                </FormGroup>
            )}
            <FormGroup>
                <CheckboxLabel>
                    <span>لقد قرأت شروط التسجيل ووافقت عليها</span>
                    <CheckboxInput
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        required
                    />
                </CheckboxLabel>
                {formErrors.agreeToTerms && <p>{formErrors.agreeToTerms}</p>}
                <Link href="https://info4iq.com/files/terms_condition.pdf" target="_blank">
                    قراءة شروط التسجيل
                </Link>
            </FormGroup>
            <SubmitButton type="submit">تسجيل</SubmitButton>
        </Form>
        </div>
    );
};

export default StudentRegistrationForm;
