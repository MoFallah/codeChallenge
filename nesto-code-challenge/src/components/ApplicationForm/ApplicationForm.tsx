import { useState, useEffect, type FC, type ChangeEvent, type FormEvent, useMemo } from 'react';
import type { Applicant, Application } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { selectIsAppLoading, selectStatusAndApplication } from '../../app/store/selectors/applicationsSelectors';
import { updateApplicationById, updateApplications } from '../../app/store/slices/applicationsSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { Button } from '../StyledButton/StyledButton';
import { Centered } from '../../styles/styled-components';
import { ErrorText, FormWrapper, Input, InputWrapper, Title } from './ApplicationForm.styles';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX, PHONE_REGEX, SPINNER_SIZE_SMALL } from '../../constants/constants';

export const ApplicationForm: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialData: Applicant = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const fieldLabels = useMemo(() => ({
    firstName: t('firstName'),
    lastName: t('lastName'),
    email: t('email'),
    phone: t('phone'),
  }), [t]);

  const [formData, setFormData] = useState<Applicant>(initialData);
  const [errors, setErrors] = useState<Partial<Applicant>>({});
  const [isSavedDisabled, setIsSavedDisabled] = useState(false);

  const { singleAppLoading: isLoading } = useSelector(selectIsAppLoading);
  const { status, application }: { status: string, application: Application | null } = useSelector(selectStatusAndApplication);
  const isApplicationEditable = application !== null;

  useEffect(() => {
    if (status === 'update' && application?.applicants[0]) {
      setFormData(application.applicants[0]);
    }
    setErrors({});
  }, [application]);

  useEffect(() => {
    Object.keys(errors).forEach((field) => {
      validateField(field as keyof Applicant, formData[field as keyof Applicant]);
    });
  }, [t]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof Applicant, value);
  };

  const validateField = (name: keyof Applicant, value: string) => {
    let error = "";

    if (!value.trim()) {
      error = `${fieldLabels[name]} ${t('required')}`;
    } else {
      if (name === "email") {
        const emailRegex = EMAIL_REGEX;
        if (!emailRegex.test(value)) {
          error = t('invalidEmail');
        }
      }
      if (name === "phone") {
        const phoneRegex = PHONE_REGEX;
        if (!phoneRegex.test(value)) {
          error = t('invalidPhone');
        }
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const getTitle = () => {
    if (status === 'save') return 'save';
    return 'update';
  }

  const isFormValid =
    Object.values(formData).every((v) => v.trim() !== "") &&
    Object.values(errors).every((err) => !err);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSave(formData as Applicant, application?.id!);
    setErrors({});
  };

  const handleSave = async (applicant: Applicant, id: string) => {
    setIsSavedDisabled(true);
    try {
      await dispatch(updateApplicationById({ id, body: { applicants: [applicant] } }));
      toast.info(t(status === 'save' ? 'applicationSaved' : 'applicationUpdated', { firstName: applicant.firstName }), {
        autoClose: 5000,
        pauseOnHover: true,
        onClose: () => {
          setIsSavedDisabled(false);
          navigate('/applications');
        },
        style: { width: "25rem" }
      });

      if (status === 'update') {
        dispatch(updateApplications(applicant));
      }

    } catch (error) {
      setIsSavedDisabled(false);
    }
  };

  if (isLoading) return <Spinner size={SPINNER_SIZE_SMALL} />;
  if (!isApplicationEditable) return <Centered data-testid="select-application">{t('selectApplication')}</Centered>;

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>{t('mainApplicant')}</Title>
      <InputWrapper>
        <Input
          name="firstName"
          placeholder={t('firstName')}
          value={formData.firstName}
          onChange={handleChange}
          $hasError={!!errors.firstName}
        />
        {errors.firstName && <ErrorText>{errors.firstName}</ErrorText>}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="lastName"
          placeholder={t('lastName')}
          value={formData.lastName}
          onChange={handleChange}
          $hasError={!!errors.lastName}
        />
        {errors.lastName && <ErrorText>{errors.lastName}</ErrorText>}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="email"
          placeholder={t('email')}
          value={formData.email}
          onChange={handleChange}
          $hasError={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </InputWrapper>
      <InputWrapper>
        <Input
          name="phone"
          placeholder={t('phone')}
          value={formData.phone}
          onChange={handleChange}
          $hasError={!!errors.phone}
        />
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </InputWrapper>
      <Button type='submit' disabled={isSavedDisabled || !isFormValid}>
        {t(getTitle())}
      </Button>
    </FormWrapper>
  );
};