import callApi from "@/lib/callApi";

/**
 * 로그인
 * @param {object} [data] - { id: '', pwd: '' }
 */
export const postLogin = async (data) => {
  return callApi({
    method: 'post',
    url: '/login',
    data,
  });
};

/**
 * 로그아웃
 */
export const logout = async () => {
  return callApi({
    method: 'get',
    url: '/logout',
  });
};

//////////////////////////// 예시 ////////////////////////////

/**
 * 예시: 특정 ID의 할 일을 가져오는 함수
 * @param {string|number} id - 가져올 할 일의 ID
 */
export const fetchTodoById = async (id) => {
  if (!id) {
    throw new Error('ID is required to fetch a todo.');
  }
  return callApi({
    method: 'get',
    url: `/todos/${id}`,
  });
};

/**
 * 예시: 새로운 할 일을 생성하는 함수 (사용자 요청에 따라 수정된 부분)
 * @param {object} todoData - 생성할 할 일 데이터 (예: { title: '새 할일', completed: false })
 */
export const createTodo = async (todoData) => {
  return callApi({
    method: 'post',
    url: '/todos',
    data: todoData, // POST 요청이므로 data 사용
  });
};

/**
 * 예시: 특정 ID의 할 일을 업데이트하는 함수
 * @param {string|number} id - 업데이트할 할 일의 ID
 * @param {object} updatedData - 업데이트할 데이터
 */
export const updateTodo = async (id, updatedData) => {
  return callApi({
    method: 'put',
    url: `/todos/${id}`,
    data: updatedData, // PUT 요청이므로 data 사용
  });
};

/**
 * 예시: 특정 ID의 할 일을 삭제하는 함수
 * @param {string|number} id - 삭제할 할 일의 ID
 */
export const deleteTodo = async (id) => {
  return callApi({
    method: 'delete',
    url: `/todos/${id}`,
  });
};