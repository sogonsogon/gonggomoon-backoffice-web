'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { useLogin } from '@/features/auth/queries';
import type { ApiErrorResponse } from '@/shared/types/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRememberEmail, setIsRememberEmail] = useState(false);
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsRememberEmail(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    if (isRememberEmail) {
      localStorage.setItem('savedEmail', email);
    } else {
      localStorage.removeItem('savedEmail');
    }
    login(
      { email, password },
      {
        onSuccess: () => {
          router.push('/industry');
        },
        onError: (error: ApiErrorResponse) => {
          setErrorMessage(error.message || '아이디 또는 비밀번호가 올바르지 않습니다.');
        },
      },
    );
  };

  return (
    <div className="flex h-screen bg-ds-grey-900 items-center justify-center p-16">
      {/* Login Form Card */}
      <div className="w-110 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-10 flex flex-col gap-8">
        {/* Logo Area */}
        <div className="flex flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="공고문 로고" style={{ height: 44, width: 'auto' }} />
          <h1 className="text-[32px] font-bold text-ds-grey-900">공고문</h1>
          <p className="text-base text-ds-grey-700">Back Office Management System</p>
        </div>

        <form id="login-form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-ds-grey-900">
              이메일
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="h-10 border-ds-grey-200 bg-white text-ds-grey-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-ds-grey-900">
              비밀번호
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className="h-10 border-ds-grey-200 bg-white pr-9 text-ds-grey-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ds-grey-400 hover:text-ds-grey-600"
              >
                {isPasswordVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-sm text-red-500" role="alert" aria-live="assertive">
              {errorMessage}
            </p>
          )}

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={isRememberEmail}
              onCheckedChange={(checked) => setIsRememberEmail(checked === true)}
            />
            <Label htmlFor="remember" className="text-ds-grey-900 cursor-pointer">
              아이디 기억하기
            </Label>
          </div>
        </form>

        {/* Login Button */}
        <Button className="h-10 w-full" type="submit" form="login-form" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>

        {/* Footer */}
        <p className="text-xs text-ds-grey-500 text-center">
          © 2026 AdminHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}
