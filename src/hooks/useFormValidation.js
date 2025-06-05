// hooks/useFormValidation.js
import { useState, useEffect, useCallback } from 'react';

export function useFormValidation(initialValues, validationRules, requiredFields = []) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState({}); // 각 필드가 한 번이라도 변경되었는지 추적

    // 단일 필드 유효성 검사 함수
    const validateField = useCallback((name, value) => {
        const rule = validationRules[name];
        if (rule) {
            const result = rule(value);
            return result === true ? '' : result; // 유효하면 빈 문자열, 아니면 에러 메시지
        }
        return ''; // 규칙이 없으면 에러 없음
    }, [validationRules]);

    // 폼 값 변경 핸들러
    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        
        setValues(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true })); // 필드가 변경되었음을 표시

        // 변경된 필드 즉시 유효성 검사
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    }, [validateField]);

    // 전체 폼 유효성 업데이트를 위한 useEffect
    useEffect(() => {
        let currentFormIsValid = true;

        // 1. 모든 필수 필드가 채워졌는지 확인
        for (const field of requiredFields) {
            if (!values[field] || String(values[field]).trim() === '') {
                currentFormIsValid = false;
                break;
            }
        }

        // 2. 현재 표시된 에러가 하나라도 있는지 확인
        if (currentFormIsValid) {
            for (const fieldName in errors) {
                if (errors[fieldName]) { // 에러 메시지가 존재하면 유효하지 않음
                    currentFormIsValid = false;
                    break;
                }
            }
        }
        
        // 3. (선택적 강화) 모든 필드가 유효성 규칙을 통과했는지 다시 확인
        // (touched된 필드만 검사할 수도 있고, 모든 필드를 검사할 수도 있음)
        if (currentFormIsValid) {
            for (const fieldName in validationRules) {
                // 아직 touched되지 않았고, 초기값이 비어있지 않은 필드에 대한 초기 유효성 검사가 필요할 수 있음
                // 여기서는 단순화를 위해 현재 errors 객체만 참조
                // 또는, 모든 필드를 다시 validateField로 검사할
                // 예: if (validateField(fieldName, values[fieldName]) !== '') { currentFormIsValid = false; break; }
            }
        }

        setIsFormValid(currentFormIsValid);
    }, [values, errors, requiredFields, validationRules, validateField]);

    // 폼 제출 시 모든 필드를 강제로 검증하고, 에러를 업데이트하는 함수
    const triggerFullValidation = useCallback(() => {
        const newErrors = {};
        let allCurrentlyValid = true;
        for (const fieldName in initialValues) { // initialValues를 기준으로 모든 필드 검사
            const error = validateField(fieldName, values[fieldName]);
            newErrors[fieldName] = error;
            if (error) {
                allCurrentlyValid = false;
            }
        }
        setErrors(newErrors);
        // 모든 필수 필드가 채워졌는지도 여기서 한 번 더 확인 가능
        for (const field of requiredFields) {
            if (!values[field] || String(values[field]).trim() === '') {
                allCurrentlyValid = false;
                break;
            }
        }
        return allCurrentlyValid;
    }, [values, initialValues, validateField, requiredFields]);
    
    // 폼 초기화 함수
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsFormValid(false);
    }, [initialValues]);


    return {
        values,
        errors,
        touched, // 각 필드의 사용 여부를 알기 위해 추가
        isFormValid,
        handleChange,
        triggerFullValidation, // 폼 제출 시 사용
        setErrors, // 외부에서 에러를 직접 설정해야 할 경우
        resetForm, // 폼 초기화 함수
    };
}