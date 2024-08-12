# be-sharing (🤝) [TODO]

```JavaScript
export class MedalCount extends HTMLElement{
    team = '',
    goldMedalCount = 0,
    silverMedalCount = 0,
    bronzeMedalCount = 0
}
customElements.define('medal-count', MedalCount);
```

```html
<table 🤝>
    <thead>
        <tr>
            <th>Team</th>
            <th>Gold Medals</th>
            <th>Silver Medals</th>
            <th>Bronze Medals</th>
        </tr>
    </thead>
    <tbody>
        <tr itemscope=medal-count>
            <td itemprop=goldMedalCount></td>
            <td itemprop=silverMedalCount></td>
            <td itemprop=bronzeMedalCount></td>
        </tr>
    </tbody>
</table>
```

What this does:

1.  Applies [be-gingerly](https://github.com/bahrus/be-gingerly) to the element adorned by the attribute.
2.  One way binds from the all the itemscope host-ish's to the microdata adorned elements.

> [!Note]
> This enhancement works best with browsers that support the @scope css selector.