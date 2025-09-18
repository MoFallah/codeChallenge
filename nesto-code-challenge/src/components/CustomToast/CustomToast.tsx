import type { FC } from "react";
import { SupportLink, ToastHeader, ToastWrapper } from "./CustomToast-styles";
import { Trans, useTranslation } from "react-i18next";
import { createSupportMailto } from "../../utils/utils";

const CustomToast: FC<{ error: string }> = ({ error }) => {

  const { t } = useTranslation();
  const mailtoLink = createSupportMailto(error, t);

  const handleSendEmail = () => {
    window.location.href = mailtoLink;
  };

  return (
    <ToastWrapper>
      <ToastHeader>{error}</ToastHeader>
      <Trans
        i18nKey="contactSupport"
        components={[
          <SupportLink onClick={handleSendEmail} />
        ]}
      />
    </ToastWrapper>
  );
};

export default CustomToast;
