import { AtomicBlockUtils, EditorState, Modifier, RichUtils, SelectionState ,ContentState} from "draft-js";
export const InsertAtomic = (editor, type, subType, param) => {
    const contentState = editor.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
        type,
        subType,
        param)
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editor.editorState, { currentContent: contentStateWithEntity });
    editor.setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
}

export const DeleteAtomic = (block, editor) => {
    const key = block.getKey();
    let contentState = editor.editorState.getCurrentContent();

    const targetRange = new SelectionState({
        anchorKey: key,
        anchorOffset: 0,
        focusKey: key,
        focusOffset: block.getLength()
    });

    let newContentState = Modifier.removeRange(
        contentState,
        targetRange,
        "backward"
    );

    var resetBlock = Modifier.setBlockType(
        newContentState,
        newContentState.getSelectionAfter(),
        'unstyled'
    );

    const newEditorState = EditorState.push(editor.editorState, resetBlock, 'remove-range')

    editor.setEditorState(newEditorState)
}