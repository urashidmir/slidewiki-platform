import {BaseStore} from 'fluxible/addons';

class SlideEditStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        //this.dispatcher = dispatcher; // Provides access to waitFor and getStore methods
        this.id = '';
        this.slideId = '';
        this.title = '';
        this.LeftPanelTitleChange = false;
        this.content = '';
        this.markdown = '';
        this.speakernotes = '';
        this.scaleratio = 1; //default no scale ratio
        this.template = '';
        this.slideSize = '';
        this.saveSlideClick = 'false';
        this.cancelClick = 'false';
        this.selector = '';
        this.undoClick = 'false';
        this.redoClick = 'false';
        this.addInputBox = 'false';
        this.uploadMediaClick = 'false';
        this.uploadVideoClick = 'false';
        this.tableClick = 'false';
        this.mathsClick = 'false';
        this.codeClick = 'false';
        this.removeBackgroundClick = 'false';
        this.embedClick = 'false';
        this.embedWidth = '';
        this.embedHeight = '';
        this.embedURL = '';
        this.embedCode = '';
        this.ltiClick = 'false';
        this.ltiWidth = '';
        this.ltiHeight = '';
        this.ltiURL = '';
        this.ltiKey = '';
        this.ltiResponseURL = '',
        this.ltiResponseHTML = '',
        this.HTMLEditorClick = 'false';
    }

    saveSlide() {
        this.emitChange();
    }
    addSlide() {
        this.emitChange();
    }
    changeTemplate(payload){
        this.template = payload.template;
        this.emitChange();
        this.template = '';
        this.emitChange();
    }
    changeSlideSize(payload){
        this.slideSize = payload.slideSize;
        this.emitChange();
        this.slideSize = '';
        this.emitChange();
    }
    handleSaveSlideClick(){
        this.saveSlideClick = 'true';
        this.emitChange();
        this.saveSlideClick = 'false';
        this.emitChange();
    }
    handleCancelClick(payload){
        this.selector = payload.selector;
        this.cancelClick = 'true';
        this.emitChange();
        this.cancelClick = 'false';
        this.emitChange();
    }
    handleUndoClick(){
        this.undoClick = 'true';
        this.emitChange();
        this.undoClick = 'false';
        this.emitChange();
    }
    handleRedoClick(){
        this.redoClick = 'true';
        this.emitChange();
        this.redoClick = 'false';
        this.emitChange();
    }
    handleAddInputBox(){
        this.addInputBox = 'true';
        this.emitChange();
        this.addInputBox = 'false';
        this.emitChange();
    }
    handleUploadMedia(){
        this.uploadMediaClick = 'true';
        this.emitChange();
        this.uploadMediaClick = 'false';
        this.emitChange();
    }
    handleuploadVideoClick(){
        this.uploadVideoClick = 'true';
        this.emitChange();
        this.uploadVideoClick = 'false';
        this.emitChange();
    }
    handleTableClick(){
        this.tableClick = 'true';
        this.emitChange();
        this.tableClick = 'false';
        this.emitChange();
    }
    handleMathsClick(){
        this.mathsClick = 'true';
        this.emitChange();
        this.mathsClick = 'false';
        this.emitChange();
    }
    handleCodeClick(){
        this.codeClick = 'true';
        this.emitChange();
        this.codeClick = 'false';
        this.emitChange();
    }
    handleRemoveBackgroundClick(){
        this.removeBackgroundClick = 'true';
        this.emitChange();
        this.removeBackgroundClick = 'false';
        this.emitChange();
    }
    handleEmbedClick(payload){
        this.embedClick = 'true';
        this.embedWidth = payload.embedWidth;
        this.embedHeight = payload.embedHeight;
        this.embedURL = payload.embedURL;
        this.embedCode = payload.embedCode;
        this.emitChange();
        this.embedClick = 'false';
        this.embedWidth = '';
        this.embedHeight = '';
        this.embedURL = '';
        this.embedCode = '';
        this.emitChange();
    }
    changeTitle(payload){
        this.title = payload.title;
        this.LeftPanelTitleChange = payload.LeftPanelTitleChange;
        this.emitChange();
        //this.title = '';
        //this.emitChange();
    }
    handleHTMLEditorClick(){
        this.HTMLEditorClick = 'true';
        this.emitChange();
        this.HTMLEditorClick = 'false';
        this.emitChange();
    }


    handleLTIAddClick(payload){
        this.ltiURL = payload.ltiURL;
        this.ltiKey = payload.ltiKey;
        this.ltiWidth = payload.ltiWidth;
        this.ltiHeight = payload.ltiHeight;
        this.ltiResponseURL = payload.ltiResponseURL;
        this.ltiResponseHTML = payload.ltiResponseHTML;
        this.ltiClick = 'true';
        this.emitChange();
        this.ltiClick = 'false';
        this.emitChange();
    }

    getState() {
        return {
            id: this.id,
            slideId: this.slideId,
            title: this.title,
            LeftPanelTitleChange: this.LeftPanelTitleChange,
            content: this.content,
            markdown: this.markdown,
            speakernotes: this.speakernotes,
            scaleratio: this.scaleratio,
            saveSlideClick: this.saveSlideClick,
            cancelClick: this.cancelClick,
            selector: this.selector,
            undoClick: this.undoClick,
            redoClick: this.redoClick,
            template: this.template,
            slideSize: this.slideSize,
            addInputBox: this.addInputBox,
            uploadMediaClick: this.uploadMediaClick,
            uploadVideoClick: this.uploadVideoClick,
            tableClick: this.tableClick,
            mathsClick: this.mathsClick,
            codeClick: this.codeClick,
            removeBackgroundClick: this.removeBackgroundClick,
            embedClick: this.embedClick,
            embedURL: this.embedURL,
            embedCode: this.embedCode,
            embedWidth: this.embedWidth,
            embedHeight: this.embedHeight,

            ltiClick: this.ltiClick,
            ltiURL: this.ltiURL,
            ltiKey: this.ltiKey,
            ltiWidth: this.ltiWidth,
            ltiHeight: this.ltiHeight,
            ltiResponseURL: this.ltiResponseURL,
            ltiResponseHTML: this.ltiResponseHTML,

            HTMLEditorClick: this.HTMLEditorClick
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.id = state.id;
        this.slideId = state.slideId;
        this.title = state.title;
        this.LeftPanelTitleChange = state.LeftPanelTitleChange;
        this.content = state.content;
        this.markdown = state.markdown;
        this.speakernotes = state.speakernotes;
        this.scaleratio = state.scaleratio;
        this.saveSlideClick = state.saveSlideClick;
        this.cancelClick = state.cancelClick;
        this.selector = state.selector;
        this.undoClick = state.undoClick;
        this.redoClick = state.redoClick;
        this.template = state.template;
        this.slideSize = state.slideSize;
        this.addInputBox = state.addInputBox;
        this.uploadMediaClick = state.uploadMediaClick;
        this.uploadVideoClick = state.uploadVideoClick;
        this.tableClick = state.tableClick;
        this.mathsClick = state.mathsClick;
        this.codeClick = state.codeClick;
        this.removeBackgroundClick = state.removeBackgroundClick;
        this.embedClick = state.embedClick;
        this.embedURL = state.embedURL;
        this.embedCode = state.embedCode;
        this.embedWidth = state.embedWidth;
        this.embedHeight = state.embedHeight;

        this.ltiClick = state.ltiClick;
        this.ltiURL = state.ltiURL;
        this.ltiKey = state.ltiKey;
        this.ltiWidth = state.ltiWidth;
        this.ltiHeight = state.ltiHeight;
        this.ltiResponseURL = state.ltiResponseURL;
        this.ltiResponseHTML = state.ltiResponseHTML;

        this.HTMLEditorClick = state.HTMLEditorClick;
    }
}

SlideEditStore.storeName = 'SlideEditStore';
SlideEditStore.handlers = {
    'SAVE_SLIDE_EDIT_SUCCESS': 'saveSlide',
    'ADD_SLIDE_EDIT_SUCCESS': 'addSlide',
    'SAVE_SLIDE_CLICK': 'handleSaveSlideClick',
    'CANCEL_CLICK': 'handleCancelClick',
    'CHANGE_TEMPLATE': 'changeTemplate',
    'CHANGE_SLIDE_SIZE': 'changeSlideSize',
    'ADD_INPUT_BOX': 'handleAddInputBox',
    'UPLOAD_MEDIA_CLICK': 'handleUploadMedia',
    'UPLOAD_VIDEO_CLICK': 'handleuploadVideoClick',
    'TABLE_CLICK': 'handleTableClick',
    'MATHS_CLICK': 'handleMathsClick',
    'CODE_CLICK': 'handleCodeClick',
    'REMOVE_BACKGROUND_CLICK': 'handleRemoveBackgroundClick',
    'EMBED_CLICK': 'handleEmbedClick',
    'ADD_LTI_SUCCESS': 'handleLTIAddClick',
    'CHANGE_TITLE': 'changeTitle',
    'HTML_EDITOR_CLICK': 'handleHTMLEditorClick',
    'UNDO_CLICK': 'handleUndoClick',
    'REDO_CLICK': 'handleRedoClick',
};

export default SlideEditStore;
