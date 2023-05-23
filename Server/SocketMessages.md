## Начальные запросы

GET_MAP, (token: string, answer:Function) - получить карту с сервера

GET_SETTLEMENTS, (token: string, answer:Function) - получить поселения с сервера

GET_CAPTAINS, (token: string, answer:Function) - получить сведения о других игроках

## Поселения

GET_SETTLEMENT, (token: string, answer:Function) - получить сведения о поселении, в котором сейчас находится капитан.

ENTER_SETTLEMENT, (token: string, settlementId: number) - войти в поселение по его айди

EXIT_SETTLEMENT, (token: string) - выйти из текущего поселения

## Рынок

UPDATE_MARKET

SELL

BUY

## Верфь

SET_SHIP, (token: string, shipId: number) -смена активного корабля по shipId

CREATE_SHIP, (token: string, sailId: number, hullId: number, cannonId: number, answer: Function) - создание корабля по трем предметам - паруса, корпус и пушка

CREATE_DEFAULT_SHIP(token: string, answer: Function) - создание стандартного корабля раз в сутки, если такого у игрока еще нет

## Капитан

UPDATE_CAPTAIN, (captain) - подпись на событие сервера по обновлению капитана

SET_POSITION, (token: string, x: number, y: number, direction: number) - перемещение корабля на карте мира