import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';

import css from './ProductModal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById } from '../../redux/productsSlice';

import {
  selectProductModalProductId,
  closeProductModal,
  selectProductModalMode,
} from '../../redux/productModalSlice';

export default function ProductModal({ onSubmit }) {
  const dispatch = useDispatch();
  const productId = useSelector(selectProductModalProductId) || null;

  // what would selector return if productId is null?
  const product = useSelector(state => selectProductById(state, productId));

  // just small thing to make modal more user friendly
  const submitButtonText = (
    useSelector(selectProductModalMode) + ' product'
  ).toLocaleUpperCase();

  const nameFieldId = useId();
  const imageUrlFieldId = useId();
  const countFieldId = useId();
  const widthFieldId = useId();
  const heightFieldId = useId();
  const weightFieldId = useId();

  const initialValues = {
    name: product ? product.name : '',
    imageUrl: product ? product.imageUrl : '',
    count: product ? product.count : 0,
    width: product ? product.size.width : 0,
    height: product ? product.size.height : 0,
    weight: product ? product.weight : 0,
  };

  const handleSubmit = (values, actions) => {
    let submitObject;

    if (!productId) {
      // ADD MODE: Build a full product object
      submitObject = {
        name: values.name,
        imageUrl: values.imageUrl,
        count: Number(values.count),
        size: {
          width: Number(values.width),
          height: Number(values.height),
        },
        weight: Number(values.weight),
        comments: [],
      };
    } else {
      // EDIT MODE: Only include changed fields
      submitObject = { id: productId };
      if (values.name !== initialValues.name) submitObject.name = values.name;
      if (values.imageUrl !== initialValues.imageUrl)
        submitObject.imageUrl = values.imageUrl;
      if (Number(values.count) !== initialValues.count)
        submitObject.count = Number(values.count);
      if (
        Number(values.width) !== initialValues.width ||
        Number(values.height) !== initialValues.height
      ) {
        submitObject.size = {
          width: Number(values.width),
          height: Number(values.height),
        };
      }
      if (Number(values.weight) !== initialValues.weight)
        submitObject.weight = Number(values.weight);
    }

    onSubmit(submitObject);
    actions.resetForm();
    dispatch(closeProductModal());
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Product name is required')
      .min(2, 'Product name must be at least 2 characters long')
      .max(50, 'Product name must be at most 50 characters long'),
    imageUrl: Yup.string()
      .required('Image URL is required')
      .url('Image URL must be a valid URL'),
    count: Yup.number()
      .required('Count is required')
      .min(1, 'Count must be at least 1'),
    width: Yup.number()
      .required('Width is required')
      .min(1, 'Width must be at least 1'),
    height: Yup.number()
      .required('Height is required')
      .min(1, 'Height must be at least 1'),
    weight: Yup.number()
      .required('Weight is required')
      .min(1, 'Height must be at least 1'),
  });

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <h2>{submitButtonText}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div>
              <label htmlFor={nameFieldId}>Product name</label>
              <Field id={nameFieldId} name="name" />
              <ErrorMessage name="name" component="span" />
            </div>
            <div>
              <label htmlFor={imageUrlFieldId}>Image URL</label>
              <Field id={imageUrlFieldId} name="imageUrl" />
              <ErrorMessage name="imageUrl" component="span" />
            </div>
            <div>
              <label htmlFor={countFieldId}>Count</label>
              <Field id={countFieldId} name="count" />
              <ErrorMessage name="count" component="span" />
            </div>
            <div>
              <label htmlFor={widthFieldId}>Width</label>
              <Field id={widthFieldId} name="width" />
              <ErrorMessage name="width" component="span" />
            </div>
            <div>
              <label htmlFor={heightFieldId}>Height</label>
              <Field id={heightFieldId} name="height" />
              <ErrorMessage name="height" component="span" />
            </div>
            <div>
              <label htmlFor={weightFieldId}>Weight</label>
              <Field id={weightFieldId} name="weight" />
              <ErrorMessage name="weight" component="span" />
            </div>
            <button type="submit">{submitButtonText}</button>
            <button type="button" onClick={() => dispatch(closeProductModal())}>
              Cancel
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
