// função for get cpfs random.
function getRandomCpf() {
    const cpfs = [
        "421.422.423-42",
        "111.222.333-00",
        "999.888.777-10"
    ];
    // return with random in index on array by indexs.
    return cpfs[Math.floor(Math.random() * cpfs.length)];
}

module.exports = getRandomCpf;