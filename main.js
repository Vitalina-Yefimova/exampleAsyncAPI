console.log('#14. JavaScript homework example file')

/*
 *
 * #1
 *
 * Функціональні Вимоги:
 * 1. Вхідні параметри:
 *  - `segment`: Рядок, який представляє сегмент шляху URL до ресурсу на API. Наприклад: `/posts` для отримання списку постів, 
 * `/posts/1` для отримання посту з ідентифікатором 1.
 *
 * 2. Запити до API:
 *  - Виконати асинхронний HTTP GET запит до `https://jsonplaceholder.typicode.com`, додавши сегмент шляху `segment` до базового URL.
 *  - Використати `fetch` для надсилання запиту.
 *
 * 3. Обробка відповідей:
 *  - У разі успішної відповіді (HTTP статус 200-299), конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (HTTP статус виходить за межі 200-299), повернути HTTP статус як індикатор помилки.
 *  - При виникненні помилки в процесі виконання запиту (наприклад, мережева помилка), логувати помилку у консоль і повертати текст помилки.
 *
 * 4. Логування:
 *  - Вивести у консоль отримані дані при успішному запиті.
 *  - Логувати помилку у консоль при її виникненні.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема асинхронних функцій (`async/await`).
 * - Належне управління помилками та виключеннями.
 * - Код має бути чистим, добре структурованим, зі зрозумілими назвами змінних та функцій.
 *
*/

async function getData(segment) { // async - это ключевое слово перед функцией указывает, что эта функция асинхронная
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com${segment}`) // fetch — это встроенная функция JavaScript для выполнения HTTP-запросов
    if (response.ok) { // response.ok — это булевое значение, которое показывает, был ли запрос успешным
      const data = await response.json() // Преобразование ответ в JSON; await - ожидает завершения выполнения асинхронной операции
      return data // Возвращение данных
    } else { //  Обрабатывает ошибки, связанные с неправильными ответами от сервера (например, 404, 500)
      console.error(`HTTP Error: ${response.status}`) // Логирование ошибки HTTP
      return response.status // Возвращение статуса ошибки; response.status — это свойство объекта response, которое возвращает HTTP статусный код ответа
    }
  } catch (error) { // catch - перехватывает любые ошибки, произошедшие внутри try; перехватывает исключения, которые могут возникнуть при выполнении кода
    console.error(`Network Error: ${error.message}`) // Логирование сетевой ошибки
    return error.message // Возвращение текста ошибки
  }
}

// Получение списка постов
getData('/posts')
  .then(function(result) {
    console.log('List of posts:', result)
  })
  .catch(function(error) {
    console.error('Error while fetching the list of posts:', error)
  });

// Получение одного поста с id=1
getData('/posts/1')
  .then(function(result) {
    console.log('Post with ID=1:', result)
  })
  .catch(function(error) {
    console.error('Error while fetching the post:', error)
  })

/*
 *
 * #2
 * Функціональні вимоги:
 *
 * 1. Вхідні параметри:
 *  - `segment`: Рядок, що вказує на сегмент API для виконання POST запиту (наприклад, `/posts`).
 *  - `data`: Об'єкт, який містить дані для відправки в тілі запиту.
 *
 * 2. Виконання запиту:
 *  - Виконати асинхронний HTTP POST запит до `https://jsonplaceholder.typicode.com`, додавши `segment` до URL. Використати `data` як тіло запиту.
 *  - Встановити необхідні заголовки для запиту, зокрема `Content-Type: application/json`.
 *
 * 3. Обробка відповіді:
 *  - У разі успішного отримання відповіді (HTTP статус 200-299), конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (HTTP статус виходить за межі 200-299), повернути повідомлення про помилку.
 *
 * 4. Логування:
 *  - Логувати у консоль результат або повідомлення про помилку.
 *
 * Технічні Вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), зокрема асинхронних функцій (`async/await`).
 * - Належне управління помилками та відповідями від API.
 *
*/

async function postData(segment, data) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com${segment}`, {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json'  // Установка заголовка
      },
      body: JSON.stringify(data)  // Преобразование объекта данных в строку JSON
    })
    if (response.ok) {
      const responseData = await response.json()  
      return responseData
    } else {
      console.error(`HTTP Error: ${response.status}`)
      return `Error: HTTP ${response.status}`  
    }
  } catch (error) {
    console.error(`Network Error: ${error.message}`)
    return `Network Error: ${error.message}`
  }
}

const newPost = {
  title: 'Test Title',
  body: 'This is a test body',
  userId: 1
}

postData('/posts', newPost)
  .then(function(result) {
    console.log('Created Post:', result)
  })
  .catch(function(error) {
    console.error('Error while creating the post:', error)
  })

/*
 *
 * #3
 *
 * Функціональні вимоги:
 *
 * 1. Вхідні параметри:
 *  - `id`: Ідентифікатор об'єкта, який потрібно оновити.
 *  - `data`: Об'єкт з даними для оновлення.
 *
 * 2. Виконання запиту:
 *  - Виконати асинхронний HTTP PUT запит до `https://jsonplaceholder.typicode.com/posts/${id}` з використанням `id` та `data`.
 *  - Встановити заголовок `Content-Type: application/json`.
 * 3. Обробка відповідей:
 *  - У разі успішної відповіді, конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (наприклад, неіснуючий ресурс або проблеми з сервером), повернути повідомлення про помилку.
 *
 * 4. Логування:
 *  - Логувати у консоль результат або повідомлення про помилку.
 *
 * Технічні Вимоги:
 * - Використання асинхронних функцій (`async/await`) для обробки HTTP запитів.
 * - Належне управління помилками та відповідями від API.
 *
 */

async function putData(id, data) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),  
    })
    if (response.ok) {
      const responseData = await response.json()
      return responseData
    } else {
      console.error(`HTTP Error: ${response.status}`)
      return `Error: HTTP ${response.status}`
    }
  } catch (error) {
    console.error(`Network Error: ${error.message}`)
    return `Network Error: ${error.message}`
  }
}

const updatedPost = {
  title: 'Updated Title',
  body: 'This is the updated body content.',
  userId: 1
}

putData(1, updatedPost)
  .then(function(result) {
    console.log('Updated Post:', result)
  })
  .catch(function(error) {
    console.error('Error while updating the post:', error)
  })

/*
 *
 * #4
 * Функціональні вимоги:
 *
 * 1. Вхідні параметри:
 *  - `id`: Ідентифікатор об'єкта, який потрібно оновити.
 *  - `data`: Об'єкт з даними для оновлення.
 *
 * 2. Виконання запиту:
 *  - Виконати асинхронний HTTP PATCH запит до `https://jsonplaceholder.typicode.com/posts/${id}` з використанням `id` та `data`.
 *  - Встановити заголовок `Content-Type: application/json`.
 *
 * 3. Обробка відповідей:
 *  - У разі успішної відповіді, конвертувати відповідь у формат JSON і повернути отримані дані.
 *  - Якщо відповідь вказує на помилку (наприклад, неіснуючий ресурс або проблеми з сервером), повернути повідомлення про помилку.
 *
 * 4. Логування:
 *  - Логувати у консоль результат або повідомлення про помилку.
 *
 * Технічні Вимоги:
 * - Використання асинхронних функцій (`async/await`) для обробки HTTP запитів.
 * - Належне управління помилками та відповідями від API.
 *
 */

async function patchData(id, data) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      const responseData = await response.json()
      return responseData
    } else {
      console.error(`HTTP Error: ${response.status}`)
      return `Error: HTTP ${response.status}`
    }
  } catch (error) {
    console.error(`Network Error: ${error.message}`)
    return `Network Error: ${error.message}`
  }
}

const partialUpdatedPost = {
  title: 'Partially Updated Title',
  body: 'This is the partially updated body content.',
}

patchData(1, partialUpdatedPost)
  .then(function(result) {
    console.log('Partially Updated Post:', result)
  })
  .catch(function(error) {
    console.error('Error while partially updating the post:', error)
  })

/*
 *
 * #5
 * Функціональні вимоги:
 *
 * 1. Вхідні дані:
 *  - Функція приймає один параметр id — ідентифікатор ресурсу, який потрібно видалити.
 *
 * 2. Запит на видалення:
 *  - Виконати асинхронний HTTP DELETE запит до API за адресою https://jsonplaceholder.typicode.com/posts/${id}, 
 * де ${id} замінюється на конкретний ідентифікатор ресурсу для видалення.
 *
 * 3. Обробка відповіді:
 *  - Якщо запит успішний (HTTP статус відповіді 200-299), логувати успішне повідомлення і повертати true.
 *  - У випадку отримання відповіді зі статусом, що вказує на помилку (все, що поза діапазоном 200-299), 
 * логувати помилку зі статусом і повертати сам статус помилки.
 *  - При виникненні помилки в процесі виконання запиту (наприклад, мережева помилка), логувати повідомлення про помилку і повертати текст помилки.
 *
 * 4. Логування:
 *  - Успішне видалення: Логувати повідомлення у консоль у форматі: "Post with id [id] has been successfully deleted.", 
 * де [id] — це ідентифікатор видаленого ресурсу.
 *  - Неуспішне видалення: Логувати повідомлення у консоль у форматі: "Failed to delete post with id [id]. Status: [status]", 
 * де [id] — ідентифікатор ресурсу, а [status] — HTTP статус відповіді.
 *  - Помилка виконання запиту: Логувати повідомлення у консоль у форматі: "Error during deletion: [error message]", 
 * де [error message] — текст помилки.
 *
 * Технічні вимоги:
 * - Використання асинхронних функцій (async/await) для обробки HTTP запитів.
 * - Забезпечити належну обробку помилок та відповідей від API.
 * - Функція повинна бути експортована для подальшого використання або тестування.
 *
 */

async function deleteData(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      return `Post with id ${id} has been successfully deleted.`
    } else {
      console.error(`Failed to delete post with id ${id}. Status: ${response.status}`)
      return `Status: ${response.status}`
    }
  } catch (error) {
    console.error(`Error during deletion: ${error.message}`)
    return `Error: ${error.message}`
  }
}

deleteData(1)
  .then(function(result) {
    console.log('Operation result:', result)
  })
  .catch(function(error) {
    console.error('Error during the deletion:', error)
  })