import * as Yup from "yup";
import {checkPasswordByAccountId} from "../service/accountService";

const account = JSON.parse(localStorage.getItem("account"));
const exchangeSchema = Yup.object().shape({
    content: Yup.string()
        .required('Vui lòng không được để trống'),
    product: Yup.string()
        .required('Vui lòng chọn sản phẩm'),
})

const editAccountInfoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Vui lòng không được để trống'),
    phone: Yup.string()
        .matches(/^(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b$/, 'Đây không phải là số điện thoại')
        .required('Vui lòng không được để trống'),
    avatar: Yup.string()
        .required('Vui lòng không được để trống'),
    address: Yup.string()
        .required('Vui lòng không được để trống'),
})

const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .test('incorrect', 'Mật khẩu không đúng', async (value) => {
            const isExist = await checkPasswordByAccountId(account.id, {password: value});
            return isExist.data;
        })
        .required('Vui lòng không được để trống'),
    newPassword: Yup.string()
        .min(6, 'Mật khẩu phải chứa ít nhất 6 kí tự')
        .matches(
            /^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
            'Mật khẩu không được chứa kí tự đặc biệt'
        )
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            'Mật khẩu phải chứa chữ cái viết hoa, viết thường và ký tự số'
        )
        .test('incorrect', 'Mật khẩu mới phải khác với mật khẩu cũ', async (value) => {
            const isExist = await checkPasswordByAccountId(account.id, {password: value});
            return !isExist.data;
        })
        .required('Vui lòng không được để trống'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp')
        .required('Vui lòng không được để trống')
});

const savePostSchema = Yup.object().shape({
    title: Yup.string()
        .required('Vui lòng không được để trống'),
    categoryPost: Yup.string()
        .required('Vui lòng không được để trống'),
    categoryProduct: Yup.string()
        .required('Vui lòng không được để trống'),
    address: Yup.string()
        .required('Vui lòng không được để trống'),
    description: Yup.string()
        .required('Vui lòng không được để trống'),
    requirement: Yup.string()
        .required('Vui lòng không được để trống'),
    avatar: Yup.string()
        .required('Vui lòng không được để trống'),
    images: Yup.string()
        .required('Vui lòng không được để trống')
})


export {
    exchangeSchema,
    editAccountInfoSchema,
    changePasswordSchema,
    savePostSchema
};