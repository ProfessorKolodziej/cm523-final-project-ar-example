// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)
// Declare a variable for the scene dom element

// Get the color changing buttons
const modifyColorBtns = Array.from(document.querySelectorAll('.modify-color'));

// This tells Aframe that a component's materials (like color) can be modified.
// I'm not sure how to change a logo, but this will help you edit a color.
// You might be able to get the rest from here.
// See https://aframe.io/docs/1.5.0/introduction/models.html#modifying-materials
AFRAME.registerComponent('modify-color', {
    init: function () {

        // Attach event listener once the model has loaded.
        this.el.addEventListener('model-loaded', () => {
            const hat = this.el.getObject3D('mesh');
            
            // Create a color modification function
            function modifyColor() {                
                // Go over the submeshes in the 3D model and modify materials.
                this.mesh.traverse(node => {
                    if (node.material !== undefined) {
                        node.material.color.set(this.control.dataset.color);
                    }
                });
            }

            modifyColorBtns.map(button => {
                // Add an event listener to each button
                // Pass the event listener the mesh and the button so it can tell what color to use
                button.addEventListener('click', modifyColor.bind({
                    mesh: hat,
                    control: button
                }));
            })
        });
    }
  });