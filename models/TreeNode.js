/**
 * Function that acts as a tree node model
 * @param {value} -- value of node  
 */
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