export default function () {
    return useState('times', () => Math.random() * 100)
}