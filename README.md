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

1.  Finds all itemprop attributed elements within its purview (table in this case)
2.  Once all browsers support scoping css, make sure we only go one level deep.
3.  For each such element it finds, create a sharing mechanism between the "hostish" of that element, specifically for the property name that matches the value of the itemprop attribute.  
4.  Note the non standard attribute itemscope=medal-count.  In the example above, because this enhancement builds on the MountObserver api, this will automatically attach a custom element with name "medal-count" via the non standard property "ish", which stands for itemscope host:

```JavaScript
oTR.ish = oMedalCountInstance 
```

If no parent itemscope attributed element is found that is either a custom element instance or that specifies a custom element name as above, then it will bind from the ShadowDOM root host.


> [!Note]
> This enhancement works best with browsers that support the @scope css selector.