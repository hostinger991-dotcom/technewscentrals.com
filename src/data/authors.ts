import { Author } from './types';

export const AUTHORS: Record<string, Author> = {
  marcus_vance: {
    name: 'Dr. Marcus Vance',
    role: 'Editor-in-Chief & Lead Silicon Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    bio: 'Former senior semiconductor thermal engineer with 14 years analyzing TSMC process nodes, mobile packaging, and RISC-V architectures.',
  },
  elena_rostova: {
    name: 'Dr. Elena Rostova',
    role: 'Principal AI Systems Researcher',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    bio: 'Postdoctoral researcher in transformer compilation, speculative decoding, and neural robotics. Fellow at IEEE Robotics & Automation.',
  },
  tariq_malik: {
    name: 'Tariq Malik, CISSP',
    role: 'Director of Defensive Engineering & Cryptography',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    bio: 'Penetration testing specialist and zero-trust architect. Specializes in kernel attack surfaces, wireguard implementations, and encrypted enclaves.',
  },
  katherine_chen: {
    name: 'Katherine Chen',
    role: 'Senior Enterprise Infrastructure & IoT Editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    bio: 'Specialist in hyperscale datacenter topologies, Thread/Matter mesh networking, and high-efficiency inverter thermodynamics.',
  },
};
