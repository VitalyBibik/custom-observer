#CUSTOM MUTATION OBSERVER


- Инициализирование обсервера.
```js
const observer = new Observer();
```
- Отслеживание изменений в элементе.  
Вызывает передаваемую функцию после изменения наблюдаемого узла.
```js
observer.subscribe(element,callback,config);
```
Передаваемые аргументы:
1. element - узел.
2. callback - функция вызываемая при изменении.
3. config - объект с булевыми параметрами.
    1. childList – изменения в непосредственных детях node.
    2. subtree – во всех потомках node.
    3. attributes – в атрибутах node.
    4. attributeFilter – массив имён атрибутов, чтобы наблюдать только за выбранными.
    5. characterData – наблюдать ли за node.data (текстовое содержимое).
    6. textNode - наблюдать за текстовыми узлами
    7. stopImmediately - отключить обсервер после изменения
- Дождаться появления элемента на странице.  
Вызывает передаваемую функцию после появления элемента.
```js
observer.waitElement(element,callback);
```
Передаваемые аргументы:
1. element - class/id/attribute.
2. callback - функция вызываемая при изменении.
- Отключить обсервер
```js
observer.unsubscribe();
```
- Удалить обсервер 
```js
observer.remove();
```
[demo demo.html](https://prnmxm.github.io/custom-observer/demo.html)
