# SeaRunner

Скачивание репозитория с гита. НЕ СКАЧИВАТЬ ZIP-АРХИВОМ!

Если у вас Git CMD, то в папке, где хотим скачать реп, пкм *тык* и выбираем Git Bash here:

  ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/fcfb4f7a-e168-450c-af2e-dcbd9964ec99)

Если же у вас GitHub Desktop, то с главой страницы репозитория, *тык* на Code и копируем ссылку на гит, ПЕРЕД ЭТИМ НУЖНО ВЫБРАТЬ ВЕТКУ dev, не main:

  ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/11ad3e3c-7002-45f2-90fb-995aa5aeb0b7)

Затем в самом GitHub Desktop, чтобы добавить новый репозиторий нужно.

1. Нажимаем Clone Repository

  ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/4a3bfedb-4fc0-495d-9483-78d9bf562038)
  
2. Вставляем ссылку, которую скопировали сюда

  ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/5cc3673e-c694-4b8e-99c9-a932f9a41976)

3. Всё, мы клонировали репозиторий, затем нам нужно создать новую ветку для своих отдельных работ. Делать это нужно в GitHub Desktop добавить новую ветку для самих себя, делается это тут

  а) ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/1d890327-8dba-4aa9-bed9-49027babce3e)

  б) ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/085bad91-6809-447f-ba99-a351127b8646)

4. Затем мы должны создать нашу ветку от ветки dev, делается это так
  
  ![image](https://github.com/astar1ka/Sea-Runner-Server/assets/90634514/5101f803-c96f-4448-8a0b-3a673fd33eaf)

 5. Всё, мы создали новую ветку для самих себя и пришло время для работы.


# УСТАНОВКА ВСЕХ ЗАВИСИМОСТЕЙ ДЛЯ РАБОТЫ СЕРВЕРА#

1. Первым делом нужно установить все зависимости для нормальной работы, делается это так:

    ```console
    npm i
    ```

2. Всё, зависимости установлены. 

3. Команда для запуска сервера в terminal VSCode, терминал можно открыть с помощью клавиш `CTRL + SHIFT + ~`, предварительно нужно перейти в папку `Server`:

    ```console
    cd server
    ```

    ```console
    npm start
    ```

4. Команды для запуска тестов, где `userAuth.test.ts` название теста, которое мы меняем на нужный нам тест:

    ```console
    npm test userAuth.test.ts
    ```

5. Для запуска всех тестов, воспользуемся командой:

    ```console
    npm test
    ```

6. Всё, сервер готов для запуска и работы в нём.


# обновление нашего репозитория для работы с учётом изменений на ветке dev #

1. В терминале запустить команду:
    
    ```console
    git pull origin dev
    ```

<table>
    <tr>
        <th>Номер</th>
        <th>Задача</th>
        <th>Исполнитель</th>
        <th>Статус</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Метод в Game для создания предмета по правилам в зависимости от type и добавление его в таблицу Items через DB.addRecord. Возвращает добавленный предмет
        Название метода: addItem; 
        вход: item_type_id: number из таблицы items_types; 
        выход: object:TItem | null</td>
        <td>---</td>
        <td>---</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Метод в DB для удаления по id, который возвращает true в случае успеха и false в случае ошибки</td>
        <td>---</td>
        <td>---</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
