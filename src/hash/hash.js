import { createHash } from 'node:crypto';

const calculateHash = (data) => {
    return createHash('sha256').update(data).digest('hex');
}

export { calculateHash };
