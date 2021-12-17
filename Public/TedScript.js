// -----JS CODE-----
// SPATIAL CONTENT PREVIEW
// Lets Preview simulate real-world Spectacles behavior when the Lens is reset.
// - Put this on a container for all objects that need to respect the camera's coordinate frame.
// This script component should initialize on Awake (the default).
// Ted Brown @ Snap // September 2021
// @input SceneObject camera
script.createEvent("OnStartEvent").bind(function() {
    script.getTransform().setWorldPosition(script.camera.getTransform().getWorldPosition());
    script.getTransform().setWorldRotation(script.camera.getTransform().getWorldRotation());
});