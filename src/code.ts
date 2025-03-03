import { getTextValue } from "./helper"

// function for loading all the needed fonts
const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" })
  await figma.loadFontAsync({ family: "Inter", style: "Medium" })
  await figma.loadFontAsync({ family: "Inter", style: "Bold" })
}


// Function to create a dynamic image for a specific number
async function createDynamicImage(value: string) {

  const text = figma.createText();
  text.fontName = { family: 'Inter', style: 'Medium' };
  text.fontSize = 300;
  text.characters = value;
  text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  text.x = 20;
  text.y = 80;

  const exportImage = await text.exportAsync({ format: 'PNG' });

  text.remove()
  return figma.createImage(exportImage).hash;
}



async function updateImageWithDynamicContent() {
  const selectedNode = figma.currentPage.selection[0];

  function findImageLayers(node: SceneNode): Array<{ imageLayer: SceneNode, textValue: string }> {
    let results: Array<{ imageLayer: SceneNode, textValue: string }> = [];

    if (node.name === "metric-value") {
      const parent = node.parent;
      if (parent && 'children' in parent) {
        const labelContainer = parent.children.find(child => child.name === "label-container")

        const dataType = labelContainer && 'children' in labelContainer ? labelContainer.children.find(child => child.type === 'TEXT')?.characters : undefined;


        if (dataType) {
          results.push({
            imageLayer: node,
            textValue: getTextValue(dataType || ''),
          });
        }
      }
    }

    if ('children' in node) {
      node.children.forEach(child => {
        results = results.concat(findImageLayers(child));
      });
    }

    return results;
  }

  if (selectedNode) {
    const imageLayers = findImageLayers(selectedNode);

    for (const { imageLayer, textValue } of imageLayers) {
      if ('fills' in imageLayer) {
        const imageHash = await createDynamicImage(textValue);
        const newFills = [{
          type: 'IMAGE',
          scaleMode: 'FIT',
          imageHash: imageHash,
        }] as const;
        imageLayer.fills = newFills;
      }
    }
  } else {
    figma.notify('Please select a node that contains image layers.');
  }



  figma.closePlugin();
}

loadFonts().then(() => {
  updateImageWithDynamicContent().catch((error) => {
    console.error('Error updating image:', error);
    figma.closePlugin();
  });
})