## Начальные запросы

GET_MAP - получить карту с сервера

GET_SETTLEMENTS - получить поселения с сервера

GET_CAPTAINS - получить сведения о других игроках

## Поселения

GET_SETTLEMENT - получить сведения о поселении, в котором сейчас находится капитан

ENTER_SETTLEMENT, (settlementId: number) - войти в поселение по его айди

EXIT_SETTLEMENT - выйти из текущего поселения

## Рынок

UPDATE_MARKET

SELL

BUY

## Верфь

SET_SHIP, (shipId: number) -смена активного корабля по shipId

CREATE_SHIP, (shipTypeId: number, sailId: number, hullId: number, cannonId: number) - создание корабля по трем предметам - паруса, корпус и пушка


## Капитан

UPDATE_CAPTAIN, (captain) - подпись на событие сервера по обновлению капитана

SET_POSITION, (x: number, y: number, direction: number) - перемещение корабля на карте мира
