// Comprehensive emoji database organized by category
const emojiDatabase = {
    emotions: {
        'happy': '😊', 'excited': '🎉', 'love': '❤️', 'sad': '😢', 
        'angry': '😠', 'surprised': '😮', 'laughing': '😂', 'crying': '😭',
        'smile': '😊', 'joy': '😄', 'grateful': '🙏', 'blessed': '🙏',
        'worried': '😟', 'nervous': '😰', 'scared': '😱', 'relieved': '😌'
    },
    
    greetings: {
        'hello': '👋', 'hi': '👋', 'hey': '👋', 'bye': '👋', 
        'goodbye': '👋', 'welcome': '🤗', 'greetings': '👋'
    },
    
    gratitude: {
        'thanks': '🙏', 'thank': '🙏', 'grateful': '🙏', 
        'appreciate': '🙏', 'kudos': '👏'
    },
    
    approval: {
        'yes': '✅', 'ok': '👌', 'okay': '👌', 'good': '👍', 
        'great': '🌟', 'awesome': '🎊', 'amazing': '✨', 
        'excellent': '⭐', 'perfect': '💯', 'best': '🏆',
        'congrats': '🎉', 'congratulations': '🎉', 'nice': '👍'
    },
    
    disapproval: {
        'no': '❌', 'nope': '❌', 'bad': '👎', 'terrible': '😖',
        'awful': '😞', 'wrong': '❌'
    },
    
    work: {
        'work': '💼', 'job': '💼', 'office': '🏢', 'meeting': '📊',
        'presentation': '📊', 'project': '📁', 'deadline': '⏰',
        'business': '💼', 'professional': '👔', 'career': '📈'
    },
    
    time: {
        'today': '📅', 'tomorrow': '📆', 'tonight': '🌙',
        'morning': '🌅', 'evening': '🌆', 'night': '🌙',
        'time': '⏰', 'clock': '🕐', 'schedule': '📅',
        'soon': '⏰', 'minutes': '⏱️', 'hours': '⏰'
    },
    
    food: {
        'food': '🍕', 'eat': '🍽️', 'lunch': '🍱', 'dinner': '🍽️',
        'breakfast': '🍳', 'coffee': '☕', 'tea': '🍵',
        'pizza': '🍕', 'burger': '🍔', 'cake': '🎂',
        'beer': '🍺', 'wine': '🍷', 'drink': '🥤',
        'chocolate': '🍫', 'dessert': '🍰', 'hungry': '🍕'
    },
    
    celebration: {
        'birthday': '🎂', 'party': '🎉', 'celebrate': '🎊',
        'anniversary': '🎊', 'cheers': '🥂', 'festive': '🎈',
        'holiday': '🎄', 'vacation': '🏖️'
    },
    
    communication: {
        'call': '📞', 'phone': '📱', 'email': '📧', 
        'message': '💬', 'text': '💬', 'chat': '💬',
        'talk': '💬', 'discuss': '💭', 'remind': '🔔',
        'reminder': '🔔', 'alert': '🔔'
    },
    
    activities: {
        'study': '📚', 'read': '📖', 'book': '📚',
        'music': '🎵', 'song': '🎵', 'movie': '🎬',
        'game': '🎮', 'play': '🎮', 'sport': '⚽',
        'exercise': '💪', 'workout': '🏋️', 'gym': '💪',
        'run': '🏃', 'running': '🏃', 'dance': '💃',
        'travel': '✈️', 'trip': '🧳', 'flight': '✈️'
    },
    
    nature: {
        'sun': '☀️', 'sunny': '☀️', 'moon': '🌙',
        'star': '⭐', 'rain': '🌧️', 'snow': '❄️',
        'tree': '🌲', 'flower': '🌸', 'nature': '🌿',
        'beach': '🏖️', 'ocean': '🌊', 'mountain': '⛰️',
        'fire': '🔥', 'hot': '🔥', 'cold': '❄️'
    },
    
    achievement: {
        'win': '🏆', 'winner': '🏆', 'success': '🎯',
        'goal': '⚽', 'achieve': '🎯', 'accomplish': '✅',
        'done': '✅', 'complete': '✅', 'finished': '✅'
    },
    
    money: {
        'money': '💰', 'cash': '💵', 'rich': '💎',
        'expensive': '💸', 'paid': '💰', 'salary': '💰',
        'bonus': '💰'
    },
    
    symbols: {
        'new': '🆕', 'hot': '🔥', 'cool': '😎',
        'top': '🔝', 'king': '👑', 'queen': '👑',
        'strong': '💪', 'power': '💪', 'brain': '🧠',
        'smart': '🧠', 'idea': '💡', 'thinking': '🤔',
        'rocket': '🚀', 'fast': '⚡', 'lightning': '⚡'
    },
    
    help: {
        'help': '🆘', 'question': '❓', 'problem': '⚠️',
        'issue': '⚠️', 'warning': '⚠️', 'emergency': '🚨'
    }
};

// Flatten the database for easy lookup
const emojiMap = {};
Object.values(emojiDatabase).forEach(category => {
    Object.assign(emojiMap, category);
});

// Style presets with different emoji selection strategies
const stylePresets = {
    fun: {
        categories: ['emotions', 'celebration', 'symbols'],
        intensity: 1.2,
        suffix: ['😊', '✨', '🎉']
    },
    professional: {
        categories: ['work', 'achievement', 'approval'],
        intensity: 0.7,
        suffix: ['💼', '✅']
    },
    casual: {
        categories: ['greetings', 'emotions', 'activities'],
        intensity: 1.0,
        suffix: ['👋', '😊']
    },
    enthusiastic: {
        categories: ['celebration', 'approval', 'emotions'],
        intensity: 1.5,
        suffix: ['🎉', '🚀', '✨', '🔥']
    },
    minimal: {
        categories: ['approval', 'symbols'],
        intensity: 0.5,
        suffix: ['✨']
    }
};

// Convert text based on current settings
function convertText() {
    const input = document.getElementById('input').value;
    const style = document.getElementById('style').value;
    const density = parseInt(document.getElementById('density').value);
    const placement = document.getElementById('placement').value;
    
    if (!input.trim()) {
        document.getElementById('output').value = '';
        return;
    }

    const preset = stylePresets[style];
    const result = processText(input, preset, density, placement);
    
    document.getElementById('output').value = result;
    updateCharCount();
}

// Process text with emoji insertion
function processText(text, preset, density, placement) {
    let result = text;
    const words = text.toLowerCase().match(/\b[\w']+\b/g) || [];
    
    // Filter emoji map based on style categories
    const relevantEmojis = {};
    preset.categories.forEach(cat => {
        if (emojiDatabase[cat]) {
            Object.assign(relevantEmojis, emojiDatabase[cat]);
        }
    });

    // Calculate how many emojis to add based on density
    const maxEmojis = Math.ceil(words.length * density * 0.15 * preset.intensity);
    let addedCount = 0;
    const matches = [];

    // Find all matching keywords
    for (const [keyword, emoji] of Object.entries(relevantEmojis)) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        const match = regex.exec(result);
        if (match) {
            matches.push({ keyword, emoji, index: match.index });
        }
    }

    // Sort matches by position and limit by density
    matches.sort((a, b) => a.index - b.index);
    const selectedMatches = matches.slice(0, maxEmojis);

    // Apply inline placement
    if (placement === 'inline' || placement === 'both') {
        // Process matches in reverse order to maintain correct indices
        selectedMatches.reverse().forEach(match => {
            const regex = new RegExp(`\\b${match.keyword}\\b`, 'i');
            result = result.replace(regex, (matched) => `${matched} ${match.emoji}`);
            addedCount++;
        });
    }

    // Apply start/end placement
    const suffixEmojis = preset.suffix.slice(0, Math.ceil(density / 2));
    
    if (placement === 'start' || placement === 'both') {
        result = suffixEmojis.join(' ') + ' ' + result;
    }
    
    if (placement === 'end' || placement === 'both') {
        result = result + ' ' + suffixEmojis.join(' ');
    }

    // If no matches were found and placement is inline, add some emojis at the end
    if (addedCount === 0 && placement === 'inline') {
        result = result + ' ' + suffixEmojis[0];
    }

    return result.trim();
}

// Copy output to clipboard
function copyOutput() {
    const output = document.getElementById('output');
    
    if (!output.value.trim()) {
        showCopyFeedback('Nothing to copy! 📝', false);
        return;
    }

    output.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback('Copied! ✅', true);
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(output.value).then(() => {
            showCopyFeedback('Copied! ✅', true);
        }).catch(() => {
            showCopyFeedback('Copy failed ❌', false);
        });
    }
}

// Show copy feedback
function showCopyFeedback(message, success) {
    const btn = document.getElementById('copyText');
    const originalText = btn.textContent;
    
    btn.textContent = message;
    
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

// Fill example text
function fillExample(text) {
    document.getElementById('input').value = text;
    convertText();
}

// Update character count
function updateCharCount() {
    const output = document.getElementById('output').value;
    document.getElementById('charCount').textContent = `${output.length} chars`;
}

// Update density label (optional visual feedback)
function updateDensityLabel() {
    // Could add visual feedback here if desired
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Auto-convert as user types
    const input = document.getElementById('input');
    
    // Debounce function for performance
    let timeout;
    input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(convertText, 300);
    });
});
