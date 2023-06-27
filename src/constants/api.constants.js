// export const BaseUrl = `https://student-aid-main.herokuapp.com`;
export const BaseUrl = `https://student-aid-main.vercel.app`;
// export const BaseUrl = `http://localhost:5000`;

export const SignUpEnd = BaseUrl + '/auth/signup';
export const SignInEnd = BaseUrl + '/auth/signin';
export const CreatePostEnd = BaseUrl + '/help/post';
export const updatePostEnd = BaseUrl + '/help/post/update';
export const getUserInfoEnd = BaseUrl + '/auth/user';
export const getAllUserEnd = BaseUrl + '/auth/users';
export const getAllPostEnd = BaseUrl + '/help/post';
export const updateInfoEnd = BaseUrl + '/auth/update-info';
export const specificPost = BaseUrl + '/help/spost';
export const CreateDonate = BaseUrl + '/donate/init';
export const updateUserPost = BaseUrl + '/auth/update-post';
export const updateUserAvatar = BaseUrl + '/auth/update-avatar';
export const updateUserDocuments = BaseUrl + '/auth/update-documents';
export const updateUserPass = BaseUrl + '/auth/update-pass';
export const updateUserDonate = BaseUrl + '/auth/update-donate';
export const updateUserReceive = BaseUrl + '/auth/update-receive';
export const paymentRequest = BaseUrl + '/payment/payment-request';
export const paymentNotification = BaseUrl + '/payment/payment-notification';
export const paymentSuccess = BaseUrl + '/payment/payment-success';
export const paymentFail = BaseUrl + '/payment/payment-fail';
export const paymentCancel = BaseUrl + '/payment/payment-cancel';
export const getDonate = BaseUrl + '/donate';
export const updateDonateInfo = BaseUrl + '/donate/update';
