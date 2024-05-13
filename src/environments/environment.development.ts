export const environment = {
  baseUrl: 'http://localhost:9000/api',

  registerUser: '/user/register',
  loginUser: '/user/login',
  checkUser: '/user/check-token',
  userTokenUser: '/user/login-check-token',
  fetchUser: '/user',
  fetchUserById: '/user/get',
  updateUserDetails: '/user/update',

  fetchBlog: '/blog/get',
  fetchBlogByUserId: '/blog/get/user',
  addBlog: '/blog/add',
  deleteBlog: '/blog/delete',
  updateBlog: '/blog/update',

  fetchTags: '/tag/get',

  fetchComment: '/comment/get',
  addComment: '/comment/add',
  deleteComment: '/comment/delete',
  updateComment: '/comment/update',

  addLike: '/like/add',
  removeLike: '/like/remove',

  followUser: '/connection/follow',
  unfollowUser: '/connection/unfollow',
  fetchFollowing: '/connection/following',
  fetchFollowers: '/connection/followers',
};
