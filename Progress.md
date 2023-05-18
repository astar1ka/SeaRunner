*Таблица прогресса исполнения задач

<table>
    <tr>
        <th>Номер</th>
        <th>Срочность</th>
        <th>Исполнитель</th>
        <th>Применение</th>
        <th>Что делает</th>
        <th>Описание</th>
        <th>Название метода</th>
        <th>Вход</th>
        <th>Выход</th>
        <th>Статус</th>
    </tr>
    <tr>
        <td>1</td>
        <td style="color: red">СРОЧНО</td>
        <td><a href="https://github.com/1337m3rcy">Андрей</td>
        <td>Предмет</td>
        <td>Создаёт новый предмет</td>
        <td>Метод в Game для создания предмета по правилам в зависимости от type и добавление его в таблицу Items через DB.addRecord. Возвращает добавленный предмет</td>
        <td>addItem</td>
        <td>item_type_id: number из таблицы items_types</td>
        <td>boolean</td>
        <td>В работе</td>
    </tr>
    <tr>
        <td>2</td>
        <td style="color: red">СРОЧНО</td>
        <td>---</td>
        <td>Предмет</td>
        <td>Удалить предмет</td>
        <td>Удаляет предмет из таблицы и из связных таблиц</td>
        <td>destroyItem</td>
        <td>item_id: number</td>
        <td>boolean</td>
        <td>---</td>
    </tr>
    <tr>
        <td>3</td>
        <td style="color: red">СРОЧНО</td>
        <td>---</td>
        <td>Предмет</td>
        <td>Изменение свойств предмета</td>
        <td>Метод активной записи Item для изменения свойств уже имеющегося предмета</td>
        <td>setValue</td>
        <td>numberValue: number value:number</td>
        <td>boolean</td>
        <td>---</td>
    </tr>
    <tr>
        <td>4</td>
        <td style="color: red">СРОЧНО</td>
        <td>---</td>
        <td>Корабль</td>
        <td>Создание корабля</td>
        <td>Метод активной записи Ships для создания корабля в зависимости от используемых ресурсов</td>
        <td>createShip</td>
        <td>item_id, item_id, item_id - id трех предметов типа Паруса, Корпус и Пушки</td>
        <td>boolean</td>
        <td>---</td>
    </tr>
    <tr>
        <td>5</td>
        <td style="color: red">СРОЧНО</td>
        <td>---</td>
        <td>Корабль</td>
        <td>Создание корабля</td>
        <td>Метод создания дефолтного корабля в активной записи</td>
        <td>createDefaultShip</td>
        <td>captain_id: number</td>
        <td>boolean</td>
        <td>---</td>
    </tr>
    <tr>
        <td>6</td>
        <td style="color: green">не срочно</td>
        <td>---</td>        
        <td>Корабль</td>
        <td>Удалить корабль</td>
        <td>Метод активной записи для удаления корабля с хп равным или ниже 0 и передачи части инвентаря тому, кто его уничтожил</td>
        <td>destroy</td>
        <td>null | captain_id: number - id того, кто разрушил корабль или в случае уничтожения корабля о препятствие null</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>7</td>
        <td style="color: green">не срочно</td>
        <td></td>       
        <td>Корабль</td>
        <td>Поменять владельца</td>
        <td>Метод активной записи по смене владельца</td>
        <td>---</td>
        <td>captain_id: number - id нового владельца</td>
        <td>boolean</td>
        <td></td>
    </tr> 
    <tr>
        <td>8</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Корабль</td>
        <td>Получение урона</td>
        <td>Метод активной записи по уменьшению хп</td>
        <td>damage</td>
        <td>captain_id: number - id того, кто нанес хп</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>9</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Капитан</td>
        <td>Смена активного корабля</td>
        <td>Метод активной записи Captain для смены активного корабля</td>
        <td>switchShip</td>
        <td>ship_id: number - id другого корабля из коллекции капитана</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>10</td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Капитан</td>
        <td>Изменение x и y</td>
        <td>Метод активной записи Captain для смены x и y</td>
        <td>move</td>
        <td>x y:number</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>11</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Капитан</td>
        <td>Смена зоны</td>
        <td>Метод активной записи Captain для смены zone</td>
        <td>enterInto</td>
        <td>zone_id: number</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>12</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Рынок</td>
        <td>Покупка предмета</td>
        <td>Метод активной записи Market, проверяет и списывает деньги из инвентаря капитана и добавляет ему в инвентарь соответствующий предмет</td>
        <td>buy</td>
        <td>id предмета</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>13</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Рынок</td>
        <td>Продажа предмета</td>
        <td>Удаляет из инвернтаря персонажа предмет и добавляет его в товары рынка, добавляя деньги в инвентарь капитана</td>
        <td>sell</td>
        <td>id предмета</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>14</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Рынок</td>
        <td>Загрузка товаров</td>
        <td>Метод активной записи Market, загружает доступные для продажи товары из таблицы с их ценами</td>
        <td>itemsList</td>
        <td>market_id</td>
        <td>TItem []</td>
        <td></td>
    </tr>
    <tr>
        <td>15</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Добавление предмета в инвентарь</td>
        <td>Метод активной записи Inventory для добавление предмета из таблицы Items в инвентарь по "item_id" и "captain_id" со "status"  ship/werehouse и 'index' равным номеру ячейки инвентаря(проверка на то, что ячейка не занята и есть свободные)</td>
        <td>putItem</td>
        <td>item_id, status, index</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>16</td>
        <td style="color: green">не срочно</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Смена владельца предмета</td>
        <td>Метод активной записи Inventory по смене captain_id</td>
        <td>trade</td>
        <td>item_id,captain_id</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>17</td>
        <td style="color: orange">срочность 50%</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Удалить предмет из инвентаря</td>
        <td>Метод активной записи Inventory по удалению предмета из инвентаря по item_id</td>
        <td>unPutItem</td>
        <td>item_id</td>
        <td>boolean</td>
        <td></td>
    </tr>
    <tr>
        <td>18</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Положить на склад/взять со склада</td>
        <td>Метод активной записи Inventory для смены status с ship на werehouse и werehouse на ship</td>
        <td>werehouse</td>
        <td>item_id, status</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>19</td>
        <td style="color: red">СРОЧНО</td>
        <td></td>
        <td>Инвентарь</td>
        <td>Показать все предметы в инвентаре</td>
        <td>Метод активной записи Inventory, который достает из таблицы items по captain_id через связь из таблицы Inventores</td>
        <td>itemList</td>
        <td></td>
        <td>TItem []</td>
        <td></td>
    </tr>
</table>