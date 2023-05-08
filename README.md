Figma plugin for creating custom maps for the [Philippine Travel Level Map](https://github.com/OSSPhilippines/philippines-travel-level-map) by denzdelvillar. This plugin will convert Figma design files into Map data for proper use in the application.

This plugin is only available for Figma design files and not for FigJam.

- [Using Figma plugins](https://help.figma.com/hc/en-us/articles/360042532714-Use-plugins-in-files)

## Sample

### Map in Figma
![CAR map in Figma](https://user-images.githubusercontent.com/59113205/236890822-c1cf57a5-a894-451a-913b-cadcb403af0c.png)

### Map in Phil Travel
![CAR map in Phil Travel](https://user-images.githubusercontent.com/59113205/236890299-f89dbee4-f797-4fe1-8555-1e5c9f1c28a2.png)


# Usage
## Supported Nodes
- Vector nodes (including arrows, but arrows won't render correctly)
- Rectangle nodes (including images, but images won't render)

## Conversion

Figma | Phil Travel | Status 
----- | ----------- | ------
File  | ---         | TODO
Page  | ---         | TODO
Frame | Map         | DONE
Node  | Province    | DONE

**Vector** nodes and **Rectangle** nodes will be converted as usable data for `<path>` SVG elements. The name of the nodes will be used as the id of the Province. The name of the **Frame** will be used as the name of the Map. In addition, the size of the **Frame** will be used as the size of the Map.

## Ignoring nodes
To ignore specific nodes, add `@ignore`  to the end of the name of the node (e.g. `"Reference @ignore"` will be ignored). This can be useful when using reference images for maps, since images are processed as a **Rectangle** node.

#### Map in Figma:
![CAR map in Figma](https://user-images.githubusercontent.com/59113205/236890057-d7004407-5af2-484e-b4af-4fdb0b285d5e.png)

#### Map in Phil Travel:
![CAR map in Phil Travel](https://user-images.githubusercontent.com/59113205/236890299-f89dbee4-f797-4fe1-8555-1e5c9f1c28a2.png)

By adding the `@ignore` at the end of the name, we prevent the image from rendering. This allows us to edit the map later if needed.

In addition, the following nodes are ignored by default and will not be processed:
- Polygon
- Star
- Ellipse
- Line
- Text
- Frame (Only Frames inside a Frame)
- Group

To handle complex province shapes, consider simplifying the shape or flattening Group nodes.

## Data Output
Currently, the only supported operation is the "Copy to Clipboard". Make sure that the **Frame** of the Map to be exported is selected before copying to clipboard. Otherwise, the first **Frame** in the first **Page** will be exported.

### Map Data
```js
{
  mapName: 'Philippines', // name of the Frame object
  size: {
    width: 69, // width of the Frame object
    height: 100, // height of the Frame object
  },
  provinces: [
    // Province data
  ],
  options: { // custom map options for future use
    initialZoom: 1.0,
  }
}
```

### Province Data
```js
{
  id: 'Baguio City', // name of the Node
  transform: 'translate(10 50)', // x y position of the Node
  drawPath: 'M 0 0 L 100 50 ....', // vectorData of the Node
}
```

## Unsupported Properties
Most properties are not supported. Only vector path data is taken. As such, the following will not be preserved. The list is exhaustive.
- stroke style
- fill
- corner radius
- rotation
- boolean operations

## License
This plugin is subject to the [Community Free Resource License](https://www.figma.com/community-free-resource-license/) of Figma.
