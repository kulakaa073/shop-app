import { nanoid } from 'nanoid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';

import css from './ProductEditModal.module.css';

export default function ProductEditModal({
  product,
  onProductAdd,
  onProductEdit,
  onModalClose,
}) {
  const submitButtonText = product ? 'Edit product' : 'Add product';

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
    const newProduct = {
      id: product ? product.id : nanoid(),
      name: values.name,
      imageUrl: values.imageUrl,
      count: Number(values.count),
      size: { width: Number(values.width), height: Number(values.height) },
      weight: values.weight,
    };
    if (product) {
      onProductEdit(newProduct);
    } else {
      onProductAdd(newProduct);
    }
    actions.resetForm();
    onModalClose();
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
    weight: Yup.string()
      .required('Weight is required')
      .matches(
        /^(0|[1-9]\d*)(kg|g)$/,
        'Weight must be a number, followed by "kg" or "g"'
      ),
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
            <button type="button" onClick={() => onModalClose()}>
              Cancel
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
