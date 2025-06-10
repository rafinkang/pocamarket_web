import { z } from "zod";

export const excludedValue = "all";

export const type = Object.freeze([
    Object.freeze({ name: "전체", value: excludedValue }),
    Object.freeze({ name: "포켓몬", value: "POKEMON" }),
    Object.freeze({ name: "트레이너", value: "TRAINER" }),
]);

export const subtype = Object.freeze([
    Object.freeze({ name: "전체", value: excludedValue, label: excludedValue }),
    Object.freeze({ name: "기본", value: "BASIC", label: "POKEMON" }),
    Object.freeze({ name: "1진화", value: "STAGE_1", label: "POKEMON" }),
    Object.freeze({ name: "2진화", value: "STAGE_2", label: "POKEMON" }),
    Object.freeze({ name: "아이템", value: "ITEM", label: "TRAINER" }),
    Object.freeze({ name: "서포터", value: "SUPPORTER", label: "TRAINER" }),
    Object.freeze({ name: "포켓몬 도구", value: "TOOL", label: "TRAINER" }),
]);

export const packSet = Object.freeze([
    Object.freeze({ name: "전체", value: excludedValue }),
    Object.freeze({ name: "최강의 유전자", value: "A1" }),
    Object.freeze({ name: "프로모A", value: "A" }),
    Object.freeze({ name: "환상이 있는 섬", value: "A1a" }),
    Object.freeze({ name: "시공의 격투", value: "A2" }),
]);

export const pack = Object.freeze([
    Object.freeze({ name: "전체", value: excludedValue, label: excludedValue }),
    Object.freeze({ name: "피카츄", value: "Pikachu", label: "A1" }),
    Object.freeze({ name: "리자몽", value: "Charizard", label: "A1" }),
    Object.freeze({ name: "뮤츠", value: "Mewtwo", label: "A1" }),
    Object.freeze({ name: "뮤", value: "Mew", label: "A1a" }),
    Object.freeze({ name: "디아루가", value: "Dialga", label: "A2" }),
    Object.freeze({ name: "펄기아", value: "Palkia", label: "A2" }),
]);

export const element = ([
    // Object.freeze({ name: "전체", value: excludedValue }),
    Object.freeze({ name: "풀", value: "GRASS" }),
    Object.freeze({ name: "불", value: "FIRE" }),
    Object.freeze({ name: "물", value: "WATER" }),
    Object.freeze({ name: "전기", value: "LIGHTNING" }),
    Object.freeze({ name: "초", value: "PSYCHIC" }),
    Object.freeze({ name: "격투", value: "FIGHTING" }),
    Object.freeze({ name: "악", value: "DARKNESS" }),
    Object.freeze({ name: "강철", value: "METAL" }),
    Object.freeze({ name: "드래곤", value: "DRAGON" }),
    Object.freeze({ name: "노말", value: "COLORLESS" }),
]);

export const rarity = Object.freeze([
    // { name: "전체", value: null },
    Object.freeze({ name: "◇", value: "COMMON" }),
    Object.freeze({ name: "◇◇", value: "UNCOMMON" }),
    Object.freeze({ name: "◇◇◇", value: "RARE" }),
    Object.freeze({ name: "◇◇◇◇", value: "RARE EX" }),
    Object.freeze({ name: "☆", value: "FULL ART" }),
    Object.freeze({ name: "☆☆", value: "FULL ART EX/SUPPORT" }),
    Object.freeze({ name: "☆☆☆", value: "IMMERSIVE" }),
    Object.freeze({ name: "♕", value: "GOLD CROWN" }),
]);

export const defaultFilter = Object.freeze({
    nameKo: "",
    type: excludedValue,
    subtype: excludedValue,
    packSet: excludedValue,
    pack: excludedValue,
    element: Object.freeze([]),
    rarity: Object.freeze([]),
});

export const defaultSort = Object.freeze([
    Object.freeze({ name: "코드순", value: "code" }),
    Object.freeze({ name: "코드역순", value: "code,desc" }),
    Object.freeze({ name: "이름순", value: "nameKo" }),
    Object.freeze({ name: "이름역순", value: "nameKo,desc" }),
])

export const formSchema = z.object({
    nameKo: z.string().nullable()
        .refine(v => v === "" || (v.length >= 2 && v.length <= 20), {
            message: "이름은 2자 이상 20자 이하로 입력해주세요."
        })
        .refine(v => v === "" || /^[a-zA-Z0-9가-힣 ]+$/.test(v), {
            message: "검색에 특수문자는 허용되지 않습니다."
        })
        .refine(v => v === "" || v.trim().length > 0, {
            message: "공백만 입력은 불가능합니다."
        }),
    type: z.string().nullable().refine(v => type.some((item) => item.value === v || v === excludedValue), {
        message: "유효하지 않은 타입입니다."
    }),
    subtype: z.string().nullable().refine(v => subtype.some((item) => item.value === v || v === excludedValue), {
        message: "유효하지 않은 서브타입입니다."
    }),
    packSet: z.string().nullable().refine(v => packSet.some((item) => item.value === v || v === excludedValue), {
        message: "유효하지 않은 확장팩입니다."
    }),
    pack: z.string().nullable().refine(v => {
        if (v === null) return true;
        return pack.some((item) => item.value === v);
    }, {
        message: "유효하지 않은 팩입니다."
    }),

    element: z.array(z.string()).refine(arr =>
        arr.every((v) => element.some((item) => item.value === v || v === null)), {
        message: "유효하지 않은 속성이 포함되어 있습니다."
    }),
    rarity: z.array(z.string()).refine(arr =>
        arr.every((v) => rarity.some((item) => item.value === v || v === null)), {
        message: "유효하지 않은 레어도가 포함되어 있습니다."
    })
});
