const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {

    constructor() {
        this.rootNode = null;
    }

    root() {
        return this.rootNode;
    }

    add(data) {
        let newNode = new Node(data);
        if (this.rootNode === null)
            this.rootNode = newNode;
        else
            this.insertNode(this.rootNode, newNode);
    }

    has(data) {
        let node = this.find(data);
        return node !== null;
    }

    find(data) {
        return this.findNode(this.rootNode, data);
    }

    remove(data) {
        this.removeNode(this.rootNode, data);
    }

    min() {
        return this.findMinNode(this.rootNode).data;
    }

    max() {
        return this.findMaxNode(this.rootNode).data;
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null)
                node.left = newNode;
            else
                this.insertNode(node.left, newNode);
        } else {
            if (node.right === null)
                node.right = newNode;
            else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    removeNode(node, data) {
        if (node === null)
            return null;
        else if (data < node.data) {
            node.left = this.removeNode(node.left, data);
            return node;
        } else if (data > node.data) {
            node.right = this.removeNode(node.right, data);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            let temp = this.findMinNode(node.right);
            node.data = temp.data;

            node.right = this.removeNode(node.right, temp.data);
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }

    findMaxNode(node) {
        if (node.right === null)
            return node;
        else
            return this.findMaxNode(node.right);
    }

    findNode(node, data) {
        if (node === null) {
            return null;
        } else if (data < node.data) {
            return this.findNode(node.left, data);
        } else if (data > node.data) {
            return this.findNode(node.right, data);
        } else {
            return node;
        }
    }
}

module.exports = {
    BinarySearchTree
};