import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import PropTypes from 'prop-types';

function ValidationInput({
    className,
    type,
    validation,
    onChange: parentOnChange,
    value: parentValue,
    defaultValue,
    errorMessage: parentProvidedErrorMessage,
    name,
    ...props
}) {
    // 현재 input의 실제 값
    const [inputValue, setInputValue] = useState(parentValue || defaultValue || '');
    // 내부 유효성 검사 결과
    const [internalErrorMessage, setInternalErrorMessage] = useState('');
    // 한글 입력 조합 상태
    const [composing, setComposing] = useState(false);

    // 부모에서 전달된 value가 변경되면 동기화
    useEffect(() => {
        if (parentValue !== undefined && parentValue !== inputValue) {
            setInputValue(parentValue);
        }
    }, [parentValue]);

    // 유효성 검사 함수
    const validateValue = useCallback((value) => {
        if (typeof validation === 'function') {
            const result = validation(value);
            setInternalErrorMessage(result === true ? '' : result);
        }
    }, [validation]);

    // input 값이 변경될 때 항상 호출
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // 한글 입력 중이 아닐 때만 부모와 유효성 검사 실행
        if (!composing) {
            // 부모 onChange 호출
            if (parentOnChange) {
                parentOnChange(e);
            }
            
            // 부모가 에러 메시지를 제공하지 않을 때만 내부 유효성 검사
            if (parentProvidedErrorMessage === undefined) {
                validateValue(newValue);
            }
        }
    };

    // 한글 입력 시작
    const handleCompositionStart = () => {
        setComposing(true);
    };

    // 한글 입력 완료
    const handleCompositionEnd = (e) => {
        setComposing(false);
        const newValue = e.target.value;
        
        // 부모 onChange 호출
        if (parentOnChange) {
            parentOnChange(e);
        }
        
        // 부모가 에러 메시지를 제공하지 않을 때만 내부 유효성 검사
        if (parentProvidedErrorMessage === undefined) {
            validateValue(newValue);
        }
    };

    // 최종 표시할 에러 메시지
    const displayError = parentProvidedErrorMessage !== undefined 
        ? parentProvidedErrorMessage 
        : internalErrorMessage;

    return (
        <div className="inline-block w-full">
            <input
                type={type}
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    displayError ? "border-destructive" : "",
                    className
                )}
                aria-invalid={!!displayError}
                {...props}
            />
            {displayError && (
                <p className="text-xs text-red-500 mt-1">
                    {displayError}
                </p>
            )}
        </div>
    );
}

ValidationInput.displayName = "ValidationInput";

export { ValidationInput };

ValidationInput.propTypes = {
  /* input 요소에 적용할 추가적인 Tailwind CSS 클래스 */
  className: PropTypes.string,
  /* input의 타입 (예: "text", "password", "email") */
  type: PropTypes.string,
  /* 실시간 유효성 검사를 위한 함수. 
  유효하면 true를, 유효하지 않으면 에러 메시지 문자열을 반환해야 합니다.*/
  validation: PropTypes.func,
  /* 부모 컴포넌트가 제어할 때 사용하는 값 (value) */
  value: PropTypes.string,
  /* 부모 컴포넌트가 제어할 때 사용하는 값 변경 핸들러 */
  onChange: PropTypes.func,
  /* 비제어 컴포넌트로 사용할 때의 초기값 */
  defaultValue: PropTypes.string,
  /* 부모 컴포넌트에서 직접 전달하는 에러 메시지. 
  이 prop이 전달되면 내부 유효성 검사 결과보다 우선적으로 표시됩니다.*/
  errorMessage: PropTypes.string,
  /* input 요소의 name 속성. 폼 제출 시 필드를 식별하는 데 사용됩니다. name은 필수 prop으로 지정*/
  name: PropTypes.string.isRequired, // 
};

ValidationInput.defaultProps = {
  type: 'text',
  className: '',
  validation: null,
  onChange: () => {},
  value: undefined,
  defaultValue: '',
  errorMessage: undefined,
};