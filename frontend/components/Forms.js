import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useProgress } from 'react-progress-bar';

const DataDiriForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useProgress();

  const handleNextStep = (values) => {
    setCurrentStep(currentStep + 1);
    if (currentStep === 2) {
      // Submit form data
      console.log(values);
    }
  };

  return (
    <Formik
      initialValues={{
        nik: '',
        nama: '',
        tglLahir: '',
        jk: '',
        telepon: '',
        alamat: '',
        jenisKunjungan: '',
        dokter: '',
        keluhan: '',
      }}
      onSubmit={(values) => {
        handleNextStep(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {currentStep === 1 && (
            <div>
              <h2>Data Diri</h2>
              <Field
                type="text"
                name="nik"
                placeholder="NIK"
                validate={(value) => {
                  if (value.length !== 16) return 'NIK harus 16 digit';
                  return null;
                }}
              />
              <ErrorMessage name="nik" component="div" />
              <br />
              <Field
                type="text"
                name="nama"
                placeholder="Nama"
              />
              <br />
              <Field
                type="date"
                name="tglLahir"
                placeholder="Tanggal Lahir"
              />
              <br />
              <Field
                type="select"
                name="jk"
                placeholder="Jenis Kelamin"
                options={[
                  { value: 'Laki-laki', label: 'Laki-laki' },
                  { value: 'Perempuan', label: 'Perempuan' },
                ]}
              />
              <br />
              <Field
                type="text"
                name="telepon"
                placeholder="Telepon"
              />
              <br />
              <Field
                type="text"
                name="alamat"
                placeholder="Alamat"
              />
              <br />
              <button type="submit">Next</button>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2>Keluhan & Kunjungan</h2>
              <Field
                type="select"
                name="jenisKunjungan"
                placeholder="Jenis Kunjungan"
                options={[
                  { value: 'Pemeriksaan Umum', label: 'Pemeriksaan Umum' },
                  { value: 'Pemeriksaan Spesifik', label: 'Pemeriksaan Spesifik' },
                ]}
              />
              <br />
              <Field
                type="select"
                name="dokter"
                placeholder="Dokter"
                options={[
                  { value: 'Dokter Umum', label: 'Dokter Umum' },
                  { value: 'Dokter Spesialis', label: 'Dokter Spesialis' },
                ]}
              />
              <br />
              <Field
                type="text"
                name="keluhan"
                placeholder="Keluhan"
              />
              <br />
              <button type="submit">Next</button>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h2>Konfirmasi & Submit</h2>
              <p>Anda telah menyelesaikan form dengan sukses!</p>
              <br />
              <button type="submit">Submit</button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DataDiriForm;