import { ValidationInput } from './ValidationInput'; // 실제 컴포넌트 경로로 수정해주세요
import { useState } from 'react';
import { validateLoginId, validatePassword, validateName, validateNickname } from '@/utils/validation';

// --- Storybook을 위한 유효성 검사 예시 함수 ---
const validateRequired = (value) => {
  if (!value || value.trim() === '') {
    return '이 필드는 필수입니다.';
  }
  return true;
};
// -----------------------------------------

export default {
  title: 'UI/ValidationInput', // Storybook 사이드바에 표시될 경로
  component: ValidationInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // prop들의 타입과 설명을 Storybook Controls 탭에 표시
  argTypes: {
    className: {
      control: 'text',
      description: 'input 요소에 적용할 추가 Tailwind CSS 클래스',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: 'input의 타입 (예: "text", "password")',
    },
    validation: {
      control: false, // 함수는 UI에서 제어하기 어려우므로 비활성화
      description: '실시간 유효성 검사 함수',
    },
    value: {
      control: 'text',
      description: '부모 컴포넌트가 제어할 때 사용하는 값 (제어 컴포넌트용)',
    },
    onChange: {
      action: 'onChange', // Storybook의 Actions 탭에서 이벤트 로그 확인
      description: '부모 컴포넌트가 제어할 때 사용하는 값 변경 핸들러',
    },
    defaultValue: {
      control: 'text',
      description: '비제어 컴포넌트로 사용할 때의 초기값',
    },
    errorMessage: {
      control: 'text',
      description: '부모로부터 직접 전달하는 에러 메시지',
    },
    name: {
      control: 'text',
      description: 'input 요소의 name 속성 (필수)',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '입력 필드 비활성화 여부',
    },
  },
};

// --- 스토리들 ---

// 1. 기본 실시간 유효성 검사 스토리
export const Default = {
  args: {
    name: 'username',
    placeholder: '이름을 입력하세요 (필수)',
    validation: validateName, // 이름이 비어있는지 검사하는 함수 연결
  },
  render: (args) => <ValidationInput {...args} />,
};

// 2. 이메일 유효성 검사 스토리
export const LoginIdValidation = {
  args: {
    name: 'loginId',
    placeholder: '아이디을 입력하세요',
    validation: validateLoginId, // 이메일 형식을 검사하는 함수 연결
  },
  render: (args) => <ValidationInput {...args} />,
};

// 3. 부모 컴포넌트로부터 에러 메시지를 직접 받는 스토리
export const WithParentError = {
  args: {
    name: 'password',
    type: 'password',
    placeholder: '비밀번호',
    // 부모로부터 받은 에러 메시지가 내부 유효성 검사보다 우선적으로 표시됨
    errorMessage: '서버로부터 받은 에러: 비밀번호가 일치하지 않습니다.',
    value: 'wrongpassword', // 에러 상황을 보여주기 위한 초기값
  },
  render: (args) => <ValidationInput {...args} />,
};

// 4. 부모 컴포넌트에 의해 값이 제어되는 스토리
// React Hook을 사용해야 하므로, render 함수를 사용합니다.
export const ControlledByParent = {
  args: {
    name: 'controlledInput',
    placeholder: '부모에 의해 제어되는 중...',
    validation: validateRequired,
  },
  render: function Render(args) {
    // Storybook의 render 함수 내에서 Hook을 사용하여 상태를 관리
    const [value, setValue] = useState('');
    const [error, setError] = useState('필수 항목입니다.');

    const handleChange = (e) => {
      const newValue = e.target.value;
      setValue(newValue); // 부모의 상태 업데이트

      // 부모 레벨에서 유효성 검사 실행
      const validationResult = validateRequired(newValue);
      setError(validationResult === true ? '' : validationResult);
    };

    return (
      <div className="flex flex-col gap-4 w-72">
        <ValidationInput
          {...args}
          value={value}
          onChange={handleChange}
          errorMessage={error}
        />
        <div className="p-2 bg-slate-100 rounded">
          <p className="text-sm font-semibold">부모 컴포넌트의 상태:</p>
          <p className="text-xs">Value: &quot;{value}&quot;</p>
          <p className="text-xs">Error: &quot;{error}&quot;</p>
        </div>
      </div>
    );
  },
};