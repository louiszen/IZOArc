[Back](../README.md)

# **Stackizo v0.1.0**
A generic react-class written for stacking HTML tags
<br/>


## **VStack**
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| flexWrap | `CSS.flex-wrap` || `"nowrap"` | Wrapping of the flexbox |
| justifyContent | `CSS.justify-content` || `"flex-start"` | The justifying way of childrens | 
| alignContent | `CSS.align-content` || `undefined` | The alignment of content |
| alignItems | `CSS.align-items` || `"center"` | The aligning way of childrens |
| height | `CSS.height` || `"100%"` | The height of the flexbox |
| spacing | `Number` || `0` | The spacing between children |
<br/>

## **HStack**
| Props | Type | Required | Default | Description |
| :---|:---:|:---:|:---:|:---|
| flexWrap | `CSS.flex-wrap` || `"nowrap"` | Wrapping of the flexbox |
| justifyContent | `CSS.justify-content` || `"flex-start"` | The justifying way of childrens | 
| alignContent | `CSS.align-content` || `undefined` | The alignment of content |
| alignItems | `CSS.align-items` || `"center"` | The aligning way of childrens |
| width | `CSS.width` || `"100%"` | The height of the flexbox |
| spacing | `Number` || `0` | The spacing between children |
<br/>

## **Spacer**
A flex-growing block for easier implement of different alignment of items

```jsx
<VStack>
  <Spacer/>
  <Item/>
</VStack>

[ ]
[ ]
[*]
```

```jsx
<VStack>
  <Item/>
  <Spacer/>
</VStack>

[*]
[ ]
[ ]
```

```jsx
<VStack>
  <Spacer/>
  <Item/>
  <Spacer/>
</VStack>

[ ]
[*]
[ ]
```

```jsx
<HStack>
  <Spacer/>
  <Item/>
</HStack>

[ ][ ][*]
```

```jsx
<HStack>
  <Item/>
  <Spacer/>
</HStack>

[*][ ][ ]
```

```jsx
<HStack>
  <Spacer/>
  <Item/>
  <Spacer/>
</HStack>

[ ][*][ ]
```


```jsx
<HStack>
  <Item/>
  <Spacer/>
  <Item/>
</HStack>

[*][ ][*]
```

```jsx
<VStack>
  <HStack>
    <Item/>
    <Spacer/>
  </HStack>
  <Spacer/>
</VStack>

[*][ ][ ]
[ ][ ][ ]
[ ][ ][ ]
```
