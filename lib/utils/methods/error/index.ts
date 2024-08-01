import { SignUpErrors } from '@/lib/utils/constants/strings';
import { TSignupErrorFields } from '../../types/sign-up-error-fields';

export const onErrorMessageMatcher = (
  type: TSignupErrorFields,
  message: string | undefined
) => {
  if (!type) return true;
  return SignUpErrors[type].some((emessage) => emessage === message);
};
