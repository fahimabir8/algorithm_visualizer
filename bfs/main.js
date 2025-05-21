 const sequence = [
      document.getElementById('node0'),
      document.getElementById('edge01'),
      document.getElementById('node1'),
      document.getElementById('edge02'),
      document.getElementById('node2'),
      document.getElementById('edge13'),
      document.getElementById('node3'),
      document.getElementById('edge14'),
      document.getElementById('node4'),
      document.getElementById('edge25'),
      document.getElementById('node5'),
    ];

    document.getElementById('reveal-btn').addEventListener('click', () => {
      // Reset all to hidden
      sequence.forEach(el => el.classList.remove('visible'));
      // Force reflow
      void document.body.offsetWidth;
      // Reveal each element in order
      sequence.forEach((el, idx) => {
        setTimeout(() => el.classList.add('visible'), idx * 500);
      });
    });