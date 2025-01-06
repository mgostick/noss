/**
 * Alt_Space-Space was burnt into my muscle memory to minimize the current window.
 * But then some brainiac decided to add "Take Screenshot" to the top of the window
 * menu. I tried to burn Alt_Space-Down-Enter into my memory, but it just didn't work.
 *
 * I finally decided to find a solution...
 *
 * Thanks to a kind anonymous redditor:
 * https://www.reddit.com/r/gnome/comments/vj2s53/possible_to_disable_new_take_screenshot_from/
 *
 * And an up to date example of WindowMenu:
 * https://ezix.org/src/lyonel/unmess/src/branch/main/extension.js
 */
import {Extension, InjectionManager} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as WindowMenu from "resource:///org/gnome/shell/ui/windowMenu.js";

export default class NoSsExtension extends Extension {
    enable() {
        this._injectionManager = new InjectionManager();
        this._injectionManager.overrideMethod(WindowMenu.WindowMenu.prototype, '_buildMenu',
            originalMethod => {
                return function(window) {
                    originalMethod.call(this, window);

                    let items = this._getMenuItems();

                    // Remove "Take screenshot" off the window menu
                    //items[0].destroy();

                    // Move "Take screenshot" just below the "Resize" button
                    this.moveMenuItem(items[0],4);

                    // Move "Take screenshot" just above the "Close" button
                    // Note: The separator line above the Close button counts as an item
                    //this.moveMenuItem(items[0],items.length-3);
                }
            }
        );
    }

    disable() {
        this._injectionManager.clear();
        this._injectionManager = null;
    }
}
