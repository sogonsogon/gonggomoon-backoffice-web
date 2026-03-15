import { useState } from 'react';
import CompanyRegisterModal from '@/features/company/components/CompanyRegisterModal';

export default function CompanyRegisterModalPreview() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [industry, setIndustry] = useState('');
  const [type, setType] = useState('');

  return (
    <CompanyRegisterModal
      open={open}
      onClose={() => setOpen(false)}
      name={name}
      setName={setName}
      year={year}
      setYear={setYear}
      industry={industry}
      setIndustry={setIndustry}
      type={type}
      setType={setType}
      onSave={() => {
        setName('');
        setYear('');
        setIndustry('');
        setType('');
        setOpen(false);
      }}
    />
  );
}
