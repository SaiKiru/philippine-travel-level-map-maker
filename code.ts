const IGNORED_NODES = [
  'POLYGON',
  'STAR',
  'ELLIPSE',
  'LINE',
  'TEXT',
  'FRAME',
  'GROUP'
];

figma.showUI(__html__);
figma.ui.resize(300, 400);

figma.ui.onmessage = msg => {
  if (msg.type === 'copy-map') {
    let selected: SceneNode = getSelectedOrFirstNode();

    if (selected.type === 'FRAME') {
      let mapData = createFrameMap(selected as FrameNode);

      figma.ui.postMessage({
        type: 'return-clipboard-data',
        data: mapData,
      });
    } else {
      figma.ui.postMessage({
        type: 'alert-message',
        data: 'Invalid object selected. Make sure it is a Frame.',
      });
    }
  } else if (msg.type === 'copy-provinces') {
    let selected: SceneNode = getSelectedOrFirstNode();

    if (selected.type === 'FRAME') {
      let mapData = createFrameMap(selected as FrameNode);

      figma.ui.postMessage({
        type: 'return-clipboard-data',
        data: mapData.provinces,
      });
    } else {
      figma.ui.postMessage({
        type: 'alert-message',
        data: 'Invalid object selected. Make sure it is a Frame.',
      });
    }
  } else if (msg.type === 'save-to-file') {
    // TODO: Compress map data into a directory and download for user
  }
};

function createFileMaps() {
  // TODO: Save each Page as a directory
}

function createPageMaps(page: PageNode) {
  // TODO: Save each Frame as a separate map
}

function createFrameMap(frame: FrameNode) {
  const provinces: any[] = [];

  frame.children.forEach(node => {
    let provinceData = convertToProvince(node);

    if (provinceData) {
      provinces.push(provinceData);
    }
  });

  return {
    mapName: frame.name,
    size: {width: frame.width, height: frame.height},
    provinces,
    options: {
      initialZoom: 1.0,
    }
  };
}

function convertToProvince(node: SceneNode) {
  if (!IGNORED_NODES.includes(node.type)
      && !/.*@ignore$/.test(node.name)
  ) {
    if (node.type === 'VECTOR') {
      return vectorToProvince(node);
    } else if (node.type === 'RECTANGLE') {
      return rectangleToProvince(node);
    } else {
      throw new Error(`Unexpected node type: ${node.type} of ${node.name}`);
    }
  }
}

function vectorToProvince(node: VectorNode) {
  return {
    id: node.name,
    transform: `translate(${node.x} ${node.y})`,
    drawPath: (node.vectorPaths.map(path => path.data)).join(' '),
  };
}

function rectangleToProvince(node: RectangleNode) {
  return {
    id: node.name,
    transform: `translate(${node.x} ${node.y})`,
    drawPath: `M 0 0 L ${node.width} 0 L ${node.width} ${node.height} L 0 ${node.height} Z`,
  };
}

function getSelectedOrFirstNode() {
  let selected: SceneNode = figma.currentPage.selection[0];

  if (!selected) {
    selected = figma.root.children[0].children[0];
  }

  return selected;
}
