import { ElementArrayFinder, ElementFinder } from 'protractor';

export class BasePage {

    /**
     * Search for the given searchText in any element's text (content) in the array of elements.  An array is
     * returned from Protractors `element.all(selector)`
     *
     * @param elementArray
     * @param searchText
     * @return {ElementArrayFinder} of the elements in the array with the searchText
     */
    public elementArrayContaining(elementArray: ElementArrayFinder, searchText: string): ElementArrayFinder {
        return elementArray.filter(function (elem) {
            return elem.getText().then((text) => {
                return text === searchText;
            });
        });
    }

    public debug(element: ElementFinder) {
        element.getInnerHtml().then(
            (successVal) => {
                console.log('BasePage.debug success: ', successVal);
            },
            (failureVal) => {
                console.log('BasePage.debug failure: ', failureVal);
            }
        );
    }

    public debugArray(elements: ElementArrayFinder) {
        elements.each(this.debug);
    }
}
