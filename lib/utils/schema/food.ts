import * as Yup from 'yup';
import { IDropdownSelectItem } from '../interfaces';

export const FoodSchema = Yup.object().shape({
  title: Yup.string().min(2).max(35).required('Required'),
  description: Yup.string().min(2).max(200).nullable(),
  category: Yup.mixed<IDropdownSelectItem>().required('Required'),
  image: Yup.string().url('Invalid image URL').required('Required'),
 
});
