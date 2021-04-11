const Node = require('./models/TreeNode').TreeNode;
const Error = require('./utils/Utils').TreeErrorHandling;

let root = null;
/**
 * Method used for creating a tree and inserting new nodes
 * Check also if the given tree value is part of the tree nodes
 * @param {value} -- node to be added 
 * @param {tree} -- tree root node
 */
function InsertValueInTree(value, tree) {
  var newNode = Node(value);
  //crate a new tree/root
  if (tree === null) {
    root = newNode;
  }
  else 
  {
    //if tree is not null, check if the tree value is already in the binary tree
    if(!searchNode(root, tree))
    {
      return Error(`Tree with root ${tree} does not exist!`);
    }
    // find the correct position in tree and add the node
    if(root === null)
    {
      return Error(`Root node ${tree} does not exist!`);
    }
    insertNode(root, newNode);
  }
  return root;
}

/**
 * Method to insert a node in a tree
 * Moves over the tree to find the location to insert a node with a given value
 * @param {root} 
 * @param {newNode}
 */
function insertNode(root, newNode)
{
  if (newNode.value < root.value)
  {
    if (root.left === null)
    {
      root.left = newNode;
    }
    else
    {
      insertNode(root.left, newNode);
    }
  }
  else
  {
    //if right is null insert node here
    if (root.right === null) {
      root.right = newNode;
    }
    else
    {
      //if right is not null recur until null is found
      insertNode(root.right, newNode);
    }
  }
  return newNode;
}

/**
 * Function checking if a value is already added to the tree
 * Used in checking if a given node value is part of the tree nodes
 * @param {node} 
 * @param {value} 
 * returns the node or null if not fount
 */
function searchNode(node, value)
{
    //if trees is empty return null
    if(node === null)
    {
      return null;
    }
    //if data is less than node's data move left
    if(value < node.value)
    {
      return searchNode(node.left, value);
    }
    //if data is less than node's data move left
    if(value > node.value)
    {
      return searchNode(node.right, value);
    }
    if(value === node.value)
    {
      return node;
    }
}

module.exports = {
  InsertValueInTree: InsertValueInTree
}