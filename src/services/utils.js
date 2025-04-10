// função for get cpfs random.
function getRandomCpf() {
    const cpfs = [
        "192.173.130-33",
        "245.537.140-94",
        "130.168.590-92"
    ];
    // return with random in index on array by indexs.
    return cpfs[Math.floor(Math.random() * cpfs.length)];
}

module.exports = {getRandomCpf};