function TreeNode(value)
{
    const newTreeNode = {
        value: value,
        left: null,
        right: null
    };
    return newTreeNode;
}

module.exports = {
    TreeNode: TreeNode
}