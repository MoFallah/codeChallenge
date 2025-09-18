import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import type { AppDispatch, RootState } from '../../app/store';
import { setLanguage } from '../../app/store/slices/uiStateSlice';
import { LANGUAGES } from '../../constants/constants';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = LANGUAGES;

const SelectorWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const ToggleButton = styled.button<{ $isSelected: boolean }>`
  background: ${(props) => (props.$isSelected ? '#007bff' : '#f0f0f0')};
  border: 1px solid #ccc;
  padding: 4px 6px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.$isSelected ? '#0056b3' : '#e0e0e0')};
  }

  @media (min-width: 768px) {
    padding: 8px 12px;
  }
`;

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const currentLanguageCode = useSelector((state: RootState) => state.uiState.language) || 'en';

  const currentLanguage = languages.find((lang) => lang.code === currentLanguageCode) || languages[0];

  const toggleLanguage = (code: string) => {
    i18n.changeLanguage(code);
    dispatch(setLanguage(code));
  };

  return (
    <SelectorWrapper>
      {languages.map((lang) => (
        <ToggleButton
          key={lang.code}
          $isSelected={lang.code === currentLanguage.code}
          onClick={() => toggleLanguage(lang.code)}
        >
          {lang.flag}
        </ToggleButton>
      ))}
    </SelectorWrapper>
  );
};