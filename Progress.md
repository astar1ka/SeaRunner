*Таблица исполнителей
<table>
    <tr>
        <th>Фамилия Имя</th>
        <th>GitHub</th>
        <th>ветка</th>
    </tr>
    <tr>
        <td>Иванов Константин</td>
        <td><a href="https://github.com/astar1ka">astar1ka</td>
        <td>astar1ka-patch-1, Ivanov-and-pancakes</td>
    </tr>
    <tr>
        <td>Коньков Андрей</td>
        <td><a href="https://github.com/1337m3rcy">1337m3rcy</td>
        <td>m3rcy</td>
    </tr>
    <tr>
        <td>Городилова Елизавета</td>
        <td><a href="https://github.com/lisaGoro">lisaGoro</td>
        <td>hill</td>
    </tr>
    <tr>
        <td>Пак Роман</td>
        <td><a href="https://github.com/dvntcxz">dvntcxz</td>
        <td></td>
    </tr>
    <tr>
        <td>Чиркова Александра</td>
        <td><a href="https://github.com/perfectowl">perfectowl</td>
        <td></td>
    </tr>
</table>

*Таблица прогресса исполнения задач
<table>
    <tr>
        <th>Номер</th>
        <th>Статус</th>
        <th>Срочность</th>
        <th>Исполнитель</th>
        <th>Применение</th>
        <th>Что делает</th>
        <th>Описание</th>
        <th>Название метода</th>
        <th>Вход</th>
        <th>Выход</th>
    </tr>
    <tr>
        <td>1</td>
        <td>В работе</td>
        <td style="color: red">СРОЧНО</td>
        <td><a href="https://github.com/1337m3rcy">Андрей Коньков</td>
        <td>Предмет</td>
        <td>Создаёт новый предмет</td>
        <td>Метод активной записи Item для создания предмета по правилам в зависимости от type и добавление его в таблицу Items через this.create Возвращает true или false</td>
        <td>addItem</td>
        <td>item_type_id: number из таблицы items_types</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>2</td>
        <td>---</td>
        <td style="color: red">СРОЧНО</td>
        <td>---</td>
        <td>Предмет</td>
        <td>Удалить предмет</td>
        <td>Удаляет предмет из таблицы и из связных таблиц</td>
        <td>destroyItem</td>
        <td>item_id: number</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>3</td>
        <td>---</td>
        <td style="color: red">СРОЧНО</td>
        <td>---</td>
        <td>Предмет</td>
        <td>Изменение свойств предмета</td>
        <td>Метод активной записи Item для изменения свойств уже имеющегося предмета</td>
        <td>setValue</td>
        <td>numberValue: number value:number</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>4</td>
        <td>---</td>
        <td style="color: red">СРОЧНО</td>
        <td><a href="https://github.com/astar1ka">Константин Иванов</td>
        <td>Корабль</td>
        <td>Создание корабля</td>
        <td>Метод активной записи Ships для создания корабля в зависимости от используемых ресурсов</td>
        <td>createShip</td>
        <td>item_id, item_id, item_id - id трех предметов типа Паруса, Корпус и Пушки</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>6</td>
        <td></td>
        <td style="color: green">не срочно</td>
        <td>---</td>        
        <td>Корабль</td>
        <td>Удалить корабль</td>
        <td>Метод активной записи для удаления корабля с хп равным или ниже 0 и передачи части инвентаря тому, кто его уничтожил</td>
        <td>destroy</td>
        <td>null | captain_id: number - id того, кто разрушил корабль или в случае уничтожения корабля о препятствие null</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>7</td>
        <td></td>
        <td style="color: green">не срочно</td>
        <td></td>       
        <td>Корабль</td>
        <td>Поменять владельца</td>
        <td>Метод активной записи по смене владельца</td>
        <td>---</td>
        <td>captain_id: number - id нового владельца</td>
        <td>boolean</td>
    </tr> 
    <tr>
        <td>8</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td>Любовь Овсянникова</td>
        <td>Корабль</td>
        <td>Получение урона</td>
        <td>Метод активной записи по уменьшению хп</td>
        <td>damage</td>
        <td>captain_id: number - id того, кто нанес хп</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>9</td>
        <td<a href="https://github.com/astar1ka">Константин Иванов></td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Капитан</td>
        <td>Смена активного корабля</td>
        <td>Метод активной записи Captain для смены активного корабля</td>
        <td>switchShip</td>
        <td>ship_id: number - id другого корабля из коллекции капитана</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>10</td>
        <td><a href="https://github.com/astar1ka">Константин Иванов</td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Капитан</td>
        <td>Изменение x и y</td>
        <td>Метод активной записи Captain для смены x и y</td>
        <td>move</td>
        <td>x y:number</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>11</td>
        <td><a href="https://github.com/astar1ka">Константин Иванов</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Капитан</td>
        <td>Смена статуса</td>
        <td>Метод активной записи Captain для смены status</td>
        <td>setStatus</td>
        <td>status: string</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>12</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Рынок</td>
        <td>Покупка предмета</td>
        <td>Метод активной записи Market, проверяет и списывает деньги из инвентаря капитана и добавляет ему в инвентарь соответствующий предмет</td>
        <td>buy</td>
        <td>id предмета</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>13</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Рынок</td>
        <td>Продажа предмета</td>
        <td>Удаляет из инвернтаря персонажа предмет и добавляет его в товары рынка, добавляя деньги в инвентарь капитана</td>
        <td>sell</td>
        <td>id предмета</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>14</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Рынок</td>
        <td>Загрузка товаров</td>
        <td>Метод активной записи Market, загружает доступные для продажи товары из таблицы с их ценами</td>
        <td>itemsList</td>
        <td>market_id</td>
        <td>TItem []</td>
    </tr>
    <tr>
        <td>15</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td><a href="https://github.com/lisaGoro">Елизавета Городилова</td>
        <td>Инвентарь</td>
        <td>Добавление предмета в инвентарь</td>
        <td>Метод активной записи Inventory для добавление предмета из таблицы Items в инвентарь по "item_id" и "captain_id" со "status"  ship/werehouse и 'index' равным номеру ячейки инвентаря(проверка на то, что ячейка не занята и есть свободные)</td>
        <td>putItem</td>
        <td>item_id</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>16</td>
        <td></td>
        <td style="color: green">не срочно</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Смена владельца предмета</td>
        <td>Метод активной записи Inventory по смене captain_id</td>
        <td>trade</td>
        <td>item_id,captain_id</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>17</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Инвентарь</td>
        <td>Удалить предмет из инвентаря</td>
        <td>Метод активной записи Inventory по удалению предмета из инвентаря по item_id</td>
        <td>unPutItem</td>
        <td>item_id</td>
        <td>boolean</td>
    </tr>
    <tr>
        <td>18</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Положить на склад/взять со склада</td>
        <td>Метод активной записи Inventory для смены status с ship на werehouse и werehouse на ship</td>
        <td>werehouse</td>
        <td>item_id, status</td>
        <td></td>
    </tr>
    <tr>
        <td>19</td>
        <td></td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Показать все предметы в инвентаре</td>
        <td>Метод активной записи Inventory, который достает из таблицы items по captain_id через связь из таблицы Inventores</td>
        <td>itemList</td>
        <td></td>
        <td>TItem []</td>
    </tr>
    <tr>
        <td>20</td>
        <td>В работе</td>
        <td style="color: red">СРОЧНО</td>
        <td><a href="https://github.com/dvntcxz">Роман Пак</td>
        <td>Склад</td>
        <td>верстка склада, перемещение предметов</td>
        <td>создание хуков для реализации перемещения</td>
        <td>werehouse</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>21</td>
        <td>В работе</td>
        <td style="color: red">СРОЧНО</td>
        <td><a href="https://github.com/dvntcxz">Роман Пак</td>
        <td>Таверна</td>
        <td>верстка таверны, найм команды</td>
        <td>создание логики для реализации найма команды</td>
        <td>tavern</td>
        <td></td>
        <td></td>
    </tr>
</table>

# Фронт

<table>
    <tr>
        <th>Номер</th>
        <th>Статус</th>
        <th>Срочность</th>
        <th>Исполнитель</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>1</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню города</td>
    </tr>
    <tr>
        <td>2</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню порта</td>
    </tr>
    <tr>
        <td>3</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню магазина</td>
    </tr>
    <tr>
        <td>4</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню трюма</td>
    </tr>
    <tr>
        <td>5</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меня корабля</td>
    </tr>
    <tr>
        <td>6</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню таверны</td>
    </tr>
    <tr>
        <td>7</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню заданий</td>
    </tr>
    <tr>
        <td>8</td>
        <td></td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Меню капитана</td>
    </tr>
</table>

# Дизайн

<table>
    <tr>
        <th>Номер</th>
        <th>Статус</th>
        <th>Срочность</th>
        <th>Исполнитель</th>
        <th>Описание</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Выполнено</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Стрелки при переключении кораблей</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Выполнено</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Следы от корабля на воде</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Выполнено</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Логотип на главной странице</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Выполнено</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Значок игры на вкладке</td>
    </tr>
    <tr>
        <td>5</td>
        <td>В работе</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Логотип</td>
    </tr>
    <tr>
        <td>6</td>
        <td>В работе</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Анимация следа</td>
    </tr>
    <tr>
        <td>7</td>
        <td>В работе</td>
        <td style="color: orange">срочность 50%</td>
        <td>Александра Чиркова</td>
        <td>Тень кита и ее анимация</td>
    </tr>
</table>
