import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegistrationForm from '../../pages/Registration/RegistrationForm'; 

describe('RegistrationForm', () => {
  it('render form dan submit kosong', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    expect(screen.getByText('Nama:')).toBeInTheDocument();
    expect(screen.getByText('NIK:')).toBeInTheDocument();
    expect(screen.getByText('Tanggal Lahir:')).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /daftar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Nama tidak boleh kosong')).toBeInTheDocument();
      // PERBAIKAN: Ubah sesuai teks yang dirender oleh Yup di DOM
      expect(screen.getByText('NIK harus 16 angka')).toBeInTheDocument();
      expect(screen.getByText('Tanggal lahir tidak boleh kosong')).toBeInTheDocument();
    });
  });

  // Test case kedua dan ketiga biarkan tetap sama karena sudah sukses (PASS)
  it('input NIK salah (kurang dari 16 angka)', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    const nikInput = screen.getByLabelText('NIK:');
    await user.type(nikInput, '12345');

    const submitButton = screen.getByRole('button', { name: /daftar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('NIK harus 16 angka')).toBeInTheDocument();
    });
  });

  it('input NIK tepat 16 digit', async () => {
    const user = userEvent.setup();
    render(<RegistrationForm />);
    
    const nikInput = screen.getByLabelText('NIK:');
    await user.type(nikInput, '1234567890123456');

    const submitButton = screen.getByRole('button', { name: /daftar/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('NIK tidak boleh kosong')).not.toBeInTheDocument();
      expect(screen.queryByText('NIK harus 16 angka')).not.toBeInTheDocument();
    });
  });
});